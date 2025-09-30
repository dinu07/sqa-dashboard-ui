export const transformBarChartFunction = (data, gqlType) => {

  const result = {
      labels: [],
      datasets: [
        {
          label: 'Passed',
          backgroundColor: '#3FBF7F',
          data: []
        },
        {
          label: 'Failed',
          backgroundColor: '#BF3F3F',
          data: []
        },
        {
          label: 'Retested',
          backgroundColor: '#EFEC1A',
          data: []
        },
        {
          label: 'Blocked',
          backgroundColor: '#C1C1C1',
          data: []
        },
        {
          label: 'Untested',
          backgroundColor: '#95F3F9',
          data: []
        }
      ],
      descriptions: []
  }

  if(data) {
    const createEntry = (testrun) => {
      // console.log('testrun--', testrun)
      result.labels.push(testrun.name)
      result.descriptions.push(testrun.description)
      result.datasets[0].data.push(testrun.passed_count)
      result.datasets[1].data.push(testrun.failed_count)
      result.datasets[2].data.push(testrun.retest_count)
      result.datasets[3].data.push(testrun.blocked_count)
      result.datasets[4].data.push(testrun.untested_count)
    }

    const testruns = data.testruns;
    if(testruns && gqlType.indexOf('TR') !== -1) {
      // console.log('---->>>', result)
      testruns.forEach((testrun) => {
        createEntry(testrun)
      });
    }

    const testplans = data.testplans;
    if(testplans && gqlType.indexOf('TP') !== -1) {
      testplans.forEach((testplan) => {
        createEntry(testplan)
      });
    }

  }
//   console.log('result', result)
  return result
}
