/** @type {import("eslint").Linter.Config}  */
module.exports = {
  rules: {
    // 运算符两侧需要有空格，并增加对枚举类型支持
    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': ['error', { int32Hint: false }],

    // 关键字前后有一个空格，并增加了对函数调用的泛型类型参数的支持。
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': 'error',

    // 指定类型时应该正确添加空格
    '@typescript-eslint/type-annotation-spacing': 'error',

    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],

    // 调用函数时，函数名与括号之间没有空格，并增加了对函数调用的泛型类型参数的支持
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': 'error',

    // 逗号前面没空格，后面有空格
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': 'error',

    // 函数声明时，对于命名函数，参数的小括号前无空格；对于匿名函数和 async 箭头函数，参数的小括号前有空格
    // 增加了对函数调用的泛型类型参数的支持
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': [
      'error',
      {
        named: 'never',
        anonymous: 'always',
        asyncArrow: 'always',
      },
    ],

    // interface 和 type 里的成员统一使用分号（;）进行分割，单行类型的最后一个元素不加分号
    '@typescript-eslint/member-delimiter-style': 'error',

    // 强制使用分号
    semi: 'off',
    '@typescript-eslint/semi': 'error',

    // 字符串字面量使用单引号包裹
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],

    //  用逗号分割多行结构，始终加上最有一个逗号（单行不用）
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],

    // 对于非空代码块，采用 Egyptian Brackets 风格
    // 增加对 enum、interface、namespace、module 的支持
    'brace-style': 'off',
    '@typescript-eslint/brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],

    // 不要使用 new Array() 和 Array() 创建数组，除非为了构造某一长度的空数组
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': ['error'],

    // 禁止定义没有使用的变量
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],

    // 禁止部分值被作为类型标注，需要对每一种被禁用的类型提供特定的说明
    // 1. 不使用大写的原始类型，应该使用小写的类型
    // 2. 对于对象类型，应使用 Record<string, unknown>，而不是 object
    // 3. 对于函数类型，应使用入参和返回值被标注的具体类型
    '@typescript-eslint/ban-types': 'warn',

    // 不允许不必要的类型标注，但允许类的属性成员进行额外标注
    '@typescript-eslint/no-inferrable-types': 'error',

    // 不允许与默认约束一致的泛型约束
    // 在 TS 3.9 版本以后，对于未指定的泛型约束，默认使用 unknown ，在这之前则是 any
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',

    // 不允许非空断言与空值合并同时使用
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'warn',

    // 不允许非空断言与可选链同时使用
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',

    // 如果索引仅用于访问正在迭代的数组，则首选 for...of 而不是 for 循环遍历数组
    '@typescript-eslint/prefer-for-of': 'warn',

    //  重载的函数写在一起
    '@typescript-eslint/adjacent-overload-signatures': 'warn',

    // 具有默认值的函数参数应该被放置到参数列表右边
    '@typescript-eslint/default-param-last': 'warn',

    // 对于枚举成员值，只允许使用普通字符串、数字、null、正则，而不允许变量复制、模板字符串等需要计算的操作
    '@typescript-eslint/prefer-literal-enum-member': 'warn',

    // 不允许对同一模块重复导入，类型可重复导入
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': 'warn',

    // 禁止使用 module 来定义命名空间
    '@typescript-eslint/prefer-namespace-keyword': 'error',

    // 接口中的方法使用属性的方式定义。使用属性去定义接口中的方法，可以获得更严格的检查
    '@typescript-eslint/method-signature-style': 'error',

    // 不允许定义空的接口，允许单继承下的空接口
    '@typescript-eslint/no-empty-interface': 'warn',

    // 禁止使用容易混淆的非空断言
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',

    // 不允许额外的非空断言
    '@typescript-eslint/no-extra-non-null-assertion': 'error',

    // 使用 as 进行类型断言而不是 <>。在 .tsx 文件中写组件时会存在冲突
    '@typescript-eslint/consistent-type-assertions': 'warn',

    // 禁止使用 tslint:<rule-flag> 等相关注释，tslint 已经不再维护了
    '@typescript-eslint/ban-tslint-comment': 'error',

    // 禁止使用其他 @ts 规则，除非提供必要的说明。
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Disable `no-undef` rule within TypeScript files
        // because it incorrectly errors when exporting default interfaces
        // https://github.com/iamturns/eslint-config-airbnb-typescript/issues/50
        // This will be caught by TypeScript compiler if `strictNullChecks` (or `strict`) is enabled
        'no-undef': 'off',

        /* Using TypeScript makes it safe enough to disable the checks below */

        // Disable ESLint-based module resolution check for improved monorepo support
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
        'import/no-unresolved': 'off',
      },
    },
  ],
};
