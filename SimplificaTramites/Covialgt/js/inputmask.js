function initMasks(parent = '') {
    $(`${parent} .frcurrency-mask`)?.inputmask('currency', {
        radixPoint: ".",
        digits: 2,
        prefix: 'Q ',
        autoUnmask: true,
        removeMaskOnSubmit: true,
        integerDigits: 13,
        allowMinus: false,
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3,
        skipRadixDance: true
    })
    $(`${parent} .frdecimal-mask`)?.inputmask('currency', {
        radixPoint: ".",
        digits: 2,
        removeMaskOnSubmit: true,
        integerDigits: 13,
        allowMinus: false,
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3,
        skipRadixDance: true
    })
    $(`${parent} .frdecimal6-mask`)?.inputmask('currency', {
        radixPoint: ".",
        digits: 6,
        removeMaskOnSubmit: true,
        integerDigits: 13,
        allowMinus: false,
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3,
        skipRadixDance: true
    })
    $(`${parent} .frdecimal6Neg-mask`)?.inputmask('currency', {
        radixPoint: ".",
        digits: 6,
        removeMaskOnSubmit: true,
        integerDigits: 13,
        allowMinus: true,
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3,
        skipRadixDance: true
    })
    $(`${parent} .frdecimalPosNeg-mask`)?.inputmask('currency', {
        radixPoint: ".",
        digits: 2,
        removeMaskOnSubmit: true,
        integerDigits: 13,
        allowMinus: true,
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3,
        skipRadixDance: true
    })
    $(`${parent} .frNegDecimal-mask`)?.inputmask('currency', {
        radixPoint: ".",
        digits: 2,
        prefix: '-',
        allowMinus: false,
        integerDigits: 13,
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3,
        skipRadixDance: true
    })
    $(`${parent} .frcurrencyneg-mask`).inputmask('currency', {
        radixPoint: ".",
        digits: 2,
        prefix: 'Q ',
        removeMaskOnSubmit: true,
        integerDigits: 13,
        allowMinus: true,
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3,
        skipRadixDance: true
    })
    $(`${parent} .f_percent-mask`)?.inputmask('currency', {
        radixPoint: ".",
        digits: 2,
        suffix: ' %',
        removeMaskOnSubmit: true,
        integerDigits: 13,
        allowMinus: false,
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3,
        skipRadixDance: true
    })
    $(`${parent} .frinteger-mask`)?.inputmask('integer', {
        removeMaskOnSubmit: true,
        integerDigits: 13,
        allowMinus: false,
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3,
        skipRadixDance: true
    })
}

initMasks()