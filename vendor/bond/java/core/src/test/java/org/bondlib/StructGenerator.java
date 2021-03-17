// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

package org.bondlib;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;

/**
 * Generates a struct of a given type with randomly set fields.
 */
public final class StructGenerator {

    private final StructGeneratorSettings settings;
    private final Random rand;

    // pool of special float values, many of which can't be generated by a random number generator
    private static final ArrayList<Float> floatSpecialValuesPool = new ArrayList<Float>();

    static {
        floatSpecialValuesPool.add(Float.NEGATIVE_INFINITY);
        floatSpecialValuesPool.add(Float.POSITIVE_INFINITY);
        floatSpecialValuesPool.add(Float.NaN);
        floatSpecialValuesPool.add(Float.MIN_VALUE);
        floatSpecialValuesPool.add(Float.MAX_VALUE);
        floatSpecialValuesPool.add(0F);
        floatSpecialValuesPool.add(-0F);
        for (float v = 1F; v < Float.MAX_VALUE; v *= 2) {
            floatSpecialValuesPool.add(v);
            floatSpecialValuesPool.add(-v);
        }
    }

    // pool of special double values, many of which can't be generated by a random number generator
    private static final ArrayList<Double> doubleSpecialValuesPool = new ArrayList<Double>();

    static {
        doubleSpecialValuesPool.add(Double.NEGATIVE_INFINITY);
        doubleSpecialValuesPool.add(Double.POSITIVE_INFINITY);
        doubleSpecialValuesPool.add(Double.NaN);
        doubleSpecialValuesPool.add(Double.MIN_VALUE);
        doubleSpecialValuesPool.add(Double.MAX_VALUE);
        doubleSpecialValuesPool.add(0D);
        doubleSpecialValuesPool.add(-0D);
        for (double v = 1D; v < Double.MAX_VALUE; v *= 2) {
            doubleSpecialValuesPool.add(v);
            doubleSpecialValuesPool.add(-v);
        }
    }

    // collection of valid Unicode code points for string generation
    private static final ArrayList<Integer> validUnicodeCodePoints;

    static {
        validUnicodeCodePoints = new ArrayList<Integer>();
        for (int codePoint = Character.MIN_CODE_POINT; codePoint <= Character.MAX_CODE_POINT; ++codePoint) {
            if (Character.isUnicodeIdentifierPart(codePoint)) {
                validUnicodeCodePoints.add(codePoint);
            }
        }
    }

    // contains the context of struct generation, passed through as a struct is generated
    private final class GenerationContext {
        // contains struct types mapped to the number of ancestors of that same struct
        private final HashMap<StructBondType, Integer> recursionDepths = new HashMap<StructBondType, Integer>();

        // tests if the given type has reached the limit of its recursion depth
        boolean hasReachedStructRecursionDepthLimit(BondType bondType, GenerationContext context) {
            // the map never has an entry for non-struct types so the method returns false
            Integer depth = context.recursionDepths.get(bondType);
            return depth != null && depth >= StructGenerator.this.settings.maxRecursiveStructDepth;
        }

        // increments current recursion depth for a struct type
        void incrementStructRecursionDepth(StructBondType bondType) {
            Integer boxedRecursionDepth = this.recursionDepths.get(bondType);
            int recursionDepth = (boxedRecursionDepth == null ? 0 : boxedRecursionDepth) + 1;
            this.recursionDepths.put(bondType, recursionDepth);
        }

        // decrements current recursion depth for a struct type
        void decrementStructRecursionDepth(StructBondType bondType) {
            // the value in the map should not be null
            Integer boxedRecursionDepth = this.recursionDepths.get(bondType);
            int recursionDepth = boxedRecursionDepth - 1;
            this.recursionDepths.put(bondType, recursionDepth);
        }
    }

    /**
     * Initializes a new generator.
     *
     * @param settings   generator settings
     * @param randomSeed random number generator seed
     */
    public StructGenerator(StructGeneratorSettings settings, long randomSeed) {
        ArgumentHelper.ensureNotNull(settings, "settings");
        this.settings = settings;
        this.rand = new Random(randomSeed);
    }

    /**
     * Generates a struct value.
     *
     * @param bondType  the type descriptor of the struct
     * @param <TStruct> the type of the struct
     * @return an instance of the struct
     */
    public <TStruct extends BondSerializable> TStruct generateStruct(StructBondType<TStruct> bondType) {
        ArgumentHelper.ensureNotNull(bondType, "bondType");
        GenerationContext context = new GenerationContext();
        @SuppressWarnings("unchecked")
        TStruct castObj = (TStruct) this.generateStruct(bondType, context);
        return castObj;
    }

    // generates a struct value within existing generation context (i.e. not the top-level)
    private BondSerializable generateStruct(StructBondType bondType, GenerationContext context) {
        context.incrementStructRecursionDepth(bondType);
        BondSerializable obj = bondType.newInstance();
        this.generateStructFields(bondType, obj, context);
        context.decrementStructRecursionDepth(bondType);
        return obj;
    }

    // retrives Field object for a given Bond struct field
    private static Field getClassField(StructBondType.StructField bondField) {
        try {
            // get the struct class that declares the field (i.e. not inherits it)
            Class fieldClass = bondField.getStructType().getValueClass();
            return fieldClass.getDeclaredField(bondField.getName());
        } catch (Exception e) {
            // should't happen
            throw new RuntimeException(e);
        }
    }

    // generates values for and sets fields of the given Bond object; recurses to the base type
    private void generateStructFields(
            StructBondType bondType, BondSerializable structValue, GenerationContext context) {
        // recurse to the base type
        if (bondType.getBaseStructType() != null) {
            this.generateStructFields(bondType.getBaseStructType(), structValue, context);
        }
        // generate fields for the current type
        StructBondType.StructField[] bondFields = bondType.getStructFields();
        for (StructBondType.StructField bondField : bondFields) {
            if (!bondField.isOptional() || this.testProbability(this.settings.probabilityOfSettingOptionalField)) {
                Field classField = getClassField(bondField);
                Object value = this.generateValue(bondField.getFieldType(), context);
                if (bondField.isDefaultNothing()) {
                    // wrap the value, use the Class of the field to figure out whether
                    // the wrapper is for Java primitive types or for Object types
                    value = wrapValue(classField, value);
                }
                // set the public field to the generated value
                try {
                    classField.set(structValue, value);
                } catch (Exception e) {
                    // should't happen
                    throw new RuntimeException(e);
                }
            }
        }
    }

    // wraps the value by appropriate Something wrapper if needed and returns the wrapper
    private static Something wrapValue(Field classField, Object value) {
        Class valueClass = classField.getType();
        Something returnValue;
        if (valueClass == SomethingBoolean.class) {
            boolean primitiveValue = (Boolean) value;
            returnValue = SomethingBoolean.wrap(primitiveValue);
        } else if (valueClass == SomethingByte.class) {
            byte primitiveValue = (Byte) value;
            returnValue = SomethingByte.wrap(primitiveValue);
        } else if (valueClass == SomethingShort.class) {
            short primitiveValue = (Short) value;
            returnValue = SomethingShort.wrap(primitiveValue);
        } else if (valueClass == SomethingInteger.class) {
            int primitiveValue = (Integer) value;
            returnValue = SomethingInteger.wrap(primitiveValue);
        } else if (valueClass == SomethingLong.class) {
            long primitiveValue = (Long) value;
            returnValue = SomethingLong.wrap(primitiveValue);
        } else if (valueClass == SomethingFloat.class) {
            float primitiveValue = (Float) value;
            returnValue = SomethingByte.wrap(primitiveValue);
        } else if (valueClass == SomethingDouble.class) {
            double primitiveValue = (Double) value;
            returnValue = SomethingDouble.wrap(primitiveValue);
        } else {
            returnValue = Something.wrap(value);
        }
        return returnValue;
    }

    // generates a pseudo-random value of the given type
    private Object generateValue(BondType bondType, GenerationContext context) {
        // use thetype descriptor's class to select code behavior
        Class bondTypeClass = bondType.getClass();
        Object returnValue;
        if (bondTypeClass == BoolBondType.class) {
            // bool
            returnValue = this.rand.nextBoolean();
        } else if (bondTypeClass == Int8BondType.class) {
            // int8
            returnValue = (byte) this.generateIntValue(7, true);
        } else if (bondTypeClass == Int16BondType.class) {
            // int16
            returnValue = (short) this.generateIntValue(15, true);
        } else if (bondTypeClass == Int32BondType.class) {
            // int32
            returnValue = (int) this.generateIntValue(31, true);
        } else if (bondTypeClass == Int64BondType.class) {
            // int64
            returnValue = this.generateIntValue(63, true);
        } else if (bondTypeClass == UInt8BondType.class) {
            // uint8
            returnValue = (byte) this.generateIntValue(8, false);
        } else if (bondTypeClass == UInt16BondType.class) {
            // uint16
            returnValue = (short) this.generateIntValue(16, false);
        } else if (bondTypeClass == UInt32BondType.class) {
            // uint32
            returnValue = (int) this.generateIntValue(32, false);
        } else if (bondTypeClass == UInt64BondType.class) {
            // uint64
            returnValue = this.generateIntValue(64, false);
        } else if (bondTypeClass == FloatBondType.class) {
            // float
            if (this.testProbability(this.settings.probabilityOfSpecialFloatingPointValue)) {
                returnValue = this.selectRandomElement(floatSpecialValuesPool);
            } else {
                returnValue = this.rand.nextFloat();
            }
        } else if (bondTypeClass == DoubleBondType.class) {
            // double
            if (this.testProbability(this.settings.probabilityOfSpecialFloatingPointValue)) {
                returnValue = this.selectRandomElement(doubleSpecialValuesPool);
            } else {
                returnValue = this.rand.nextDouble();
            }
        } else if (bondTypeClass == StringBondType.class || bondTypeClass == WStringBondType.class) {
            // string/wstring
            returnValue = this.generateStringValue();
        } else if (bondTypeClass == NullableBondType.class) {
            // nullable<>
            NullableBondType nullableBondType = (NullableBondType) bondType;
            BondType nullableValueBondType = nullableBondType.getValueType();
            if (!context.hasReachedStructRecursionDepthLimit(nullableValueBondType, context) &&
                    !this.testProbability(this.settings.probabilityOfValueAssignedToNull)) {
                returnValue = this.generateValue(nullableValueBondType, context);
            } else {
                returnValue = null;
            }
        } else if (bondTypeClass == VectorBondType.class) {
            // vector<>
            VectorBondType vectorBondType = (VectorBondType) bondType;
            BondType vectorElementBondType = vectorBondType.getElementType();
            List vectorValue = vectorBondType.newDefaultValue();
            this.generateCollectionElements(vectorValue, vectorElementBondType, context);
            returnValue = vectorValue;
        } else if (bondTypeClass == ListBondType.class) {
            // list<>
            ListBondType listBondType = (ListBondType) bondType;
            BondType listElementBondType = listBondType.getElementType();
            List listValue = listBondType.newDefaultValue();
            this.generateCollectionElements(listValue, listElementBondType, context);
            returnValue = listValue;
        } else if (bondTypeClass == SetBondType.class) {
            // set<>
            SetBondType setBondType = (SetBondType) bondType;
            BondType setElementBondType = setBondType.getElementType();
            Set setValue = setBondType.newDefaultValue();
            this.generateCollectionElements(setValue, setElementBondType, context);
            returnValue = setValue;
        } else if (bondTypeClass == MapBondType.class) {
            // map<,>
            MapBondType mapBondType = (MapBondType) bondType;
            BondType mapKeyBondType = mapBondType.getKeyType();
            BondType mapValueBondType = mapBondType.getValueType();
            Map mapValue = mapBondType.newDefaultValue();
            this.generateMapElements(mapValue, mapKeyBondType, mapValueBondType, context);
            returnValue = mapValue;
        } else if (bondTypeClass == BondedBondType.class) {
            // bonded<>
            BondedBondType bondedBondType = (BondedBondType) bondType;
            StructBondType declaredStructBondType = bondedBondType.getValueType();
            ArrayList<StructBondType> allowedPolymorphicStructBondTypes =
                    this.getPolymorphicStructBondTypesFor(declaredStructBondType);
            StructBondType actualStructBondType = this.selectRandomElement(allowedPolymorphicStructBondTypes);
            BondSerializable structValue = this.generateStruct(actualStructBondType, context);
            returnValue = Bonded.fromObject(structValue);
        } else if (EnumBondType.class.isAssignableFrom(bondTypeClass)) {
            // generated enum
            EnumBondType enumBondType = (EnumBondType) bondType;
            returnValue = this.generateEnumValue(enumBondType);
        } else if (StructBondType.class.isAssignableFrom(bondTypeClass)) {
            StructBondType structBondType = (StructBondType) bondType;
            returnValue = this.generateStruct(structBondType, context);
        } else {
            // unknown
            throw new IllegalArgumentException("Unknown BondType implementation: " + bondTypeClass);
        }
        return returnValue;
    }

    // returns true if a pseudo-random number distributed uniformly between 0 and 1 is less than the argument
    private boolean testProbability(double probability) {
        return this.rand.nextDouble() < probability;
    }

    /**
     * Generates a random number whose width is randomly selected between 1 and maxBitCount.
     * If the isSigned argument is true, then the sign of the value is randomly selected.
     * All widths have equal probability and once the width has been determined the values of that
     * with have equal probability as well. This algorithm give more likelihood to smaller numbers
     * than larger onces, which is useful to get coverage of variable-length integer encodings.
     *
     * @param maxBitCount maximum number of bits, at most 64 (if unsigned) or 63 (if signed)
     * @param isSigned    whether the generated value is signed,
     * @return generated integer value
     */
    public final long generateIntValue(int maxBitCount, boolean isSigned) {
        if (maxBitCount < 0 || maxBitCount > (isSigned ? 63 : 64)) {
            throw new IllegalArgumentException(
                    "maxBitCount must be between 1 and 64 (unsigned) or 63 (signed), was: " + maxBitCount);
        }
        int bitCount = this.rand.nextInt(maxBitCount) + 1;
        long result = 0;
        for (int currentBitIndex = 0; currentBitIndex < bitCount; ++currentBitIndex) {
            if (this.rand.nextBoolean()) {
                result |= (1 << currentBitIndex);
            }
        }
        if (isSigned && this.rand.nextBoolean()) {
            if (result == 0) {
                // use the most negative number of the given width
                result = ~0L << bitCount;
            } else {
                result = -result;
            }
        }
        return result;
    }

    /**
     * Generates a random string as a sequence of all valid Unicode code points.
     * The length of the string is selected randomly between 0 and the maximum length
     * specified in the settings. Then the string is filled with random code points.
     *
     * @return a random string
     */
    public final String generateStringValue() {
        int length = this.rand.nextInt(this.settings.maxGeneratedStringLength + 1);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; ++i) {
            // pick the character (as Unicode code point) randomly
            int codePointIndex = rand.nextInt(validUnicodeCodePoints.size());
            int codePoint = validUnicodeCodePoints.get(codePointIndex);
            sb.appendCodePoint(codePoint);
        }
        return sb.toString();
    }

    /**
     * Generates a random Bond enum value.
     *
     * @param enumBondType enum Bond type
     * @return random enum value
     */
    public final BondEnum generateEnumValue(EnumBondType<?> enumBondType) {
        // use reflection to invoke the static member to create an enum value
        try {
            Method getMethod = enumBondType.getValueClass().getMethod("get", int.class);
            int int32Value = (int) this.generateIntValue(31, true);
            return (BondEnum) getMethod.invoke(null, int32Value);
        } catch (Exception ex) {
            // shouldn't happen
            throw new RuntimeException(ex);
        }
    }

    /**
     * Selects a random element of a list.
     *
     * @param list the list
     * @param <T>  list elements
     * @return random element of the list
     */
    public final <T> T selectRandomElement(List<T> list) {
        ArgumentHelper.ensureNotNull(list, "list");
        int index = this.rand.nextInt(list.size());
        return list.get(index);
    }

    // helper to generate collection (vector/list/set) elements
    @SuppressWarnings("unchecked")
    private void generateCollectionElements(
            Collection collection, BondType elementType, GenerationContext context) {
        if (!context.hasReachedStructRecursionDepthLimit(elementType, context)) {
            int length = this.rand.nextInt(this.settings.maxGeneratedContainerLength + 1);
            for (int i = 0; i < length; ++i) {
                Object elementValue = this.generateValue(elementType, context);
                collection.add(elementValue);
            }
        }
    }

    // helper to generate map entries
    @SuppressWarnings("unchecked")
    private void generateMapElements(
            Map map, BondType keyType, BondType valueType, GenerationContext context) {
        if (!context.hasReachedStructRecursionDepthLimit(keyType, context) &&
                !context.hasReachedStructRecursionDepthLimit(valueType, context)) {
            int length = this.rand.nextInt(this.settings.maxGeneratedContainerLength + 1);
            for (int i = 0; i < length; ++i) {
                Object keyValue = this.generateValue(keyType, context);
                Object valueValue = this.generateValue(valueType, context);
                if (!map.containsKey(keyValue)) {
                    map.put(keyValue, valueValue);
                }
            }
        }
    }

    // gets a collection of all struct Bond types that are derived from the given base, inclusive
    private ArrayList<StructBondType> getPolymorphicStructBondTypesFor(StructBondType baseBondType) {
        ArrayList<StructBondType> result = new ArrayList<StructBondType>();
        result.add(baseBondType);
        for (StructBondType<?> polymorphicBondType : this.settings.polymorphicBondTypes) {
            if (polymorphicBondType.isSubtypeOf(baseBondType)) {
                result.add(polymorphicBondType);
            }
        }
        return result;
    }
}
