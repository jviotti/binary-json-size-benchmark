"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UINT4_MAX = exports.UINT4_MIN = exports.UINT8_MAX = exports.UINT8_MIN = exports.HALF_BYTE_BITS = exports.BYTE_BITS = void 0;
exports.BYTE_BITS = 8;
exports.HALF_BYTE_BITS = exports.BYTE_BITS / 2;
exports.UINT8_MIN = 0;
exports.UINT8_MAX = Math.pow(2, exports.BYTE_BITS) - 1;
exports.UINT4_MIN = 0;
exports.UINT4_MAX = Math.pow(2, exports.HALF_BYTE_BITS) - 1;
