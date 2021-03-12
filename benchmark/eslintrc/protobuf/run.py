def encode(json, schema):
    payload = schema.Main()
    payload.extension = json['extends']
    payload.parser = json['parser']
    payload.ecmaFeatures.jsx = json['ecmaFeatures']['jsx']
    payload.plugins.extend(json['plugins'])
    payload.env.browser = json['env']['browser']
    payload.env.node = json['env']['node']
    payload.env.es6 = json['env']['es6']

    payload.rules.eqeqeq = json['rules']['eqeqeq']
    payload.rules.commaDangle = json['rules']['comma-dangle']
    payload.rules.noConsole = json['rules']['no-console']
    payload.rules.noDebugger = json['rules']['no-debugger']
    payload.rules.noExtraSemi = json['rules']['no-extra-semi']
    payload.rules.noExtraParens = json['rules']['no-extra-parens']
    payload.rules.noIrregularWhitespace = \
            json['rules']['no-irregular-whitespace']
    payload.rules.noUndef = json['rules']['no-undef']
    payload.rules.noUnusedVars = json['rules']['no-unused-vars']
    payload.rules.semi = json['rules']['semi']
    payload.rules.semiSpacing = json['rules']['semi-spacing']

    jsdoc1 = payload.rules.validJsdoc.add()
    jsdoc2 = payload.rules.validJsdoc.add()

    jsdoc1.numeric = json['rules']['valid-jsdoc'][0]
    jsdoc2.options.requireReturn = \
            json['rules']['valid-jsdoc'][1]['requireReturn']

    payload.rules.reactDisplayName = json['rules']['react/display-name']
    payload.rules.reactForbidPropTypes = json['rules']['react/forbid-prop-types']
    payload.rules.reactJsxBooleanValue = json['rules']['react/jsx-boolean-value']
    payload.rules.reactJsxClosingBracketLocation = json['rules']['react/jsx-closing-bracket-location']
    payload.rules.reactJsxCurlySpacing = json['rules']['react/jsx-curly-spacing']
    payload.rules.reactJsxIndentProps = json['rules']['react/jsx-indent-props']
    payload.rules.reactJsxMaxPropsPerLine = json['rules']['react/jsx-max-props-per-line']
    payload.rules.reactJsxNoDuplicateProps = json['rules']['react/jsx-no-duplicate-props']
    payload.rules.reactJsxNoLiterals = json['rules']['react/jsx-no-literals']
    payload.rules.reactJsxNoUndef = json['rules']['react/jsx-no-undef']
    payload.rules.reactJsxSortPropTypes = json['rules']['react/jsx-sort-prop-types']
    payload.rules.reactJsxSortProps = json['rules']['react/jsx-sort-props']
    payload.rules.reactJsxUsesReact = json['rules']['react/jsx-uses-react']
    payload.rules.reactJsxUsesVars = json['rules']['react/jsx-uses-vars']
    payload.rules.reactNoDanger = json['rules']['react/no-danger']
    payload.rules.reactNoDidMountSetState = json['rules']['react/no-did-mount-set-state']
    payload.rules.reactNoDidUpdateSetState = json['rules']['react/no-did-update-set-state']
    payload.rules.reactNoDirectMutationState = json['rules']['react/no-direct-mutation-state']
    payload.rules.reactNoMultiComp = json['rules']['react/no-multi-comp']
    payload.rules.reactNoSetState = json['rules']['react/no-set-state']
    payload.rules.reactNoUnknownProperty = json['rules']['react/no-unknown-property']
    payload.rules.reactPropTypes = json['rules']['react/prop-types']
    payload.rules.reactReactInJsxScope = json['rules']['react/react-in-jsx-scope']
    payload.rules.reactRequireExtension = json['rules']['react/require-extension']
    payload.rules.reactSelfClosingComp = json['rules']['react/self-closing-comp']
    payload.rules.reactSortComp = json['rules']['react/sort-comp']
    payload.rules.reactWrapMultilines = json['rules']['react/wrap-multilines']

    return payload

def decode(payload):
    return {
        'extends': payload.extension,
        'parser': payload.parser,
        'ecmaFeatures': {
            'jsx': payload.ecmaFeatures.jsx
        },
        'plugins': list(payload.plugins),
        'env': {
            'browser': payload.env.browser,
            'node': payload.env.node,
            'es6': payload.env.es6
        },
        'rules': {
            'eqeqeq': payload.rules.eqeqeq,
            'comma-dangle': payload.rules.commaDangle,
            'no-console': payload.rules.noConsole,
            'no-debugger': payload.rules.noDebugger,
            'no-extra-semi': payload.rules.noExtraSemi,
            'no-extra-parens': payload.rules.noExtraParens,
            'no-irregular-whitespace': payload.rules.noIrregularWhitespace,
            'no-undef': payload.rules.noUndef,
            'no-unused-vars': payload.rules.noUnusedVars,
            'semi': payload.rules.semi,
            'semi-spacing': payload.rules.semiSpacing,
            'valid-jsdoc': [
                payload.rules.validJsdoc[0].numeric,
                {
                    'requireReturn': \
                        payload.rules.validJsdoc[1].options.requireReturn
                }
            ],

            'react/display-name': payload.rules.reactDisplayName,
            'react/forbid-prop-types': payload.rules.reactForbidPropTypes,
            'react/jsx-boolean-value': payload.rules.reactJsxBooleanValue,
            'react/jsx-closing-bracket-location': \
                    payload.rules.reactJsxClosingBracketLocation,
            'react/jsx-curly-spacing': payload.rules.reactJsxCurlySpacing,
            'react/jsx-indent-props': payload.rules.reactJsxIndentProps,
            'react/jsx-max-props-per-line': \
                    payload.rules.reactJsxMaxPropsPerLine,
            'react/jsx-no-duplicate-props': \
                    payload.rules.reactJsxNoDuplicateProps,
            'react/jsx-no-literals': payload.rules.reactJsxNoLiterals,
            'react/jsx-no-undef': payload.rules.reactJsxNoUndef,
            'react/jsx-sort-prop-types': \
                    payload.rules.reactJsxSortPropTypes,
            'react/jsx-sort-props': payload.rules.reactJsxSortProps,
            'react/jsx-uses-react': payload.rules.reactJsxUsesReact,
            'react/jsx-uses-vars': payload.rules.reactJsxUsesVars,
            'react/no-danger': payload.rules.reactNoDanger,
            'react/no-did-mount-set-state': \
                    payload.rules.reactNoDidMountSetState,
            'react/no-did-update-set-state': \
                    payload.rules.reactNoDidUpdateSetState,
            'react/no-direct-mutation-state': \
                    payload.rules.reactNoDirectMutationState,
            'react/no-multi-comp': payload.rules.reactNoMultiComp,
            'react/no-set-state': payload.rules.reactNoSetState,
            'react/no-unknown-property': \
                    payload.rules.reactNoUnknownProperty,
            'react/prop-types': payload.rules.reactPropTypes,
            'react/react-in-jsx-scope': payload.rules.reactReactInJsxScope,
            'react/require-extension': payload.rules.reactRequireExtension,
            'react/self-closing-comp': payload.rules.reactSelfClosingComp,
            'react/sort-comp': payload.rules.reactSortComp,
            'react/wrap-multilines': payload.rules.reactWrapMultilines
        }
    }
