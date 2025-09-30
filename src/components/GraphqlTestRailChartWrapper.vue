<template>
  <ApolloQuery :query="query" :variables="variables" :update="update">
    <template slot-scope="{ result: { loading, error, data }, isLoading }">
        <div class="table-responsive">
            <section v-if="isLoading">
                <div  class="d-flex justify-content-center">
                    <div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </section>
            
            <section v-else-if="error">
                <div class="alert alert-danger" role="alert">
                    Some error occurred while fetching data from server. 
                    Please try after sometime!
                </div>
            </section>
            <section v-if="data"> 
              <div class="card border-info mb-3">
                <div class="card-header">
                    <h5 class="text-left"><strong>{{title}}</strong></h5>
                </div>
                <div class="card-body justify-content-center">
                  <div v-if="gqlType.indexOf('combined') != -1" class="row">
                    <div class="col-8">
                      <TestRailPieChart  :datasets="data.datasets" :labels="data.labels"/>
                      <ChartFooter/>
                    </div>
                    <div class="col-4">
                        <table height="100%">
                          <tbody>
                            <tr>
                              <td class="align-middle" style="padding-left: 6rem;">
                                    <h1 class="text-info pass-percent-text">{{data.stats.passPercent}}</h1>
                                    <h4 class="text-info">{{data.stats.passMsg}}</h4>
                                    <h5 class="text-muted">{{data.stats.passDesc}}</h5>
                                    <h5 class="text-muted">{{data.stats.untestedDesc}}</h5>
                                    <!-- <span class="align-middle badge badge-light">{{data}}</span> -->
                              </td>
                            </tr>
                          </tbody>
                            
                        </table>
                    </div>
                  </div>
                  <TestRailChart v-else :datasets="data.datasets" :labels="data.labels"/>
                  <ChartFooter v-if="gqlType.indexOf('combined') === -1"/>
                </div>
              </div>             
            </section>
        </div>
    </template>
  </ApolloQuery>
</template>

<script>

import TestRailChart from './TestRailChart'
import TestRailPieChart from './TestRailPieChart'
import ChartFooter from './ChartFooter'
import { getGqlBasedOnName } from '../graphql/queries/testrailQueries'

// labels are different test things
const LABELS_TEMPLATE = []

const DATASETS_TEMPLATE = [
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
      ]

const transformBarChartFunction = (data, gqlType) => {

  const result = {
      labels: Object.assign([],LABELS_TEMPLATE),
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
      ]
  }

  if(data) {
    const createEntry = (testrun) => {
      // console.log('testrun--', testrun)
      result.labels.push(testrun.name)
      result.datasets[0].data.push(testrun.passed_count)
      result.datasets[1].data.push(testrun.failed_count)
      result.datasets[2].data.push(testrun.retest_count)
      result.datasets[3].data.push(testrun.blocked_count)
      result.datasets[4].data.push(testrun.untested_count)
    }

    const testruns = data.milestone.testruns;
    if(testruns && gqlType.indexOf('TR') !== -1) {
      // console.log('---->>>', result)
      testruns.forEach((testrun) => {
        createEntry(testrun)
      });
    }

    const testplans = data.milestone.testplans;
    if(testplans && gqlType.indexOf('TP') !== -1) {
      testplans.forEach((testplan) => {
        createEntry(testplan)
      });
    }


  }

  return result
}

const transformPieChartFunction = (data) => {
  let labels = Object.assign([], DATASETS_TEMPLATE.map(t=>t.label))
  let backgroundColor = Object.assign([], DATASETS_TEMPLATE.map(t=>t.backgroundColor))
  let chartData = [];
  const resultStats = data.milestone.results_stats;
  // console.log('resultStats', resultStats)
  if(resultStats) {
    chartData = [     resultStats.passed_count, 
                      resultStats.failed_count,
                      resultStats.retest_count,
                      resultStats.blocked_count,
                      resultStats.untested_count,
                ]
  }

  return {
    labels,
    datasets: [{
      backgroundColor,
      data: chartData
    }],
    stats: {
      passPercent: Math.round(chartData[0] * 100/chartData.reduce((a, b)=> a+ b)) + '%',
      passMsg: 'Passed',
      passDesc: chartData[0] + '/' + chartData.reduce((a, b)=> a+ b),
      untestedDesc: 'Untested (' + Math.round(chartData[4] * 100/chartData.reduce((a, b)=> a+ b)) + '%)'
    }
  }
}
const transformFunction = (data, gqlType) => {
  if(gqlType === 'combined' || gqlType === 'Acombined') {
    return transformPieChartFunction(data)
  } else {
    return transformBarChartFunction(data, gqlType);
  }
}

export default {
  name: "GraphqlTestRailChartWrapper",
  components: {TestRailChart, TestRailPieChart, ChartFooter},
  props: ['title','gqlType','gqlParams'],
  data() {
    const transformedData = (data) => transformFunction(data, this.gqlType)
    
    return {
      query: getGqlBasedOnName(this.gqlType),
      update: transformedData,
      variables: this.gqlParams
    }
  }
}
</script>
<style scoped>
/* .pass-percent-text {
  font-size: 6rem;
} */
</style>