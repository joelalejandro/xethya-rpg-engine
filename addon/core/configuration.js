export default {
  levelUpAlgorithmName: 'marchel',

  openThrow: {
    lowerBound: 90,
    upperBound: 100,
    lowerBoundDifficultyIncrease: 1
  },

  blunderThrow: {
    lowerBound: 1,
    upperBound: 5,
    lowerBlunderSeverity: 1,
    upperBlunderSeverity: 100,
    severityRanges: {
      minimal:      [1, 20],
      regular:      [21, 40],
      severe:       [41, 60],
      disastrous:   [61, 90],
      catastrophic: [91, 100]
    }
  },

  damageTypes: [
    'slashing',
    'bashing',
    'piercing'
  ],

  materialTypes: [
    'iron'
  ]
};
