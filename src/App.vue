<template>
    <div id="app" class="container-fluid">
      <ApolloQuery :query="query" :variables="variable">
          <template slot-scope="{ result: { loading, error, data }}">
            <div class="table-responsive" style="margin-bottom: -1rem;">
              <section v-if="data">
                <div style="margin-top:0.5rem;" v-if="data.overallStatus.milestoneStatus || data.overallStatus.issueStatus" class="alert alert-warning alert-dismissible fade show h4" role="alert">
                    Milestone: {{data.overallStatus.name}} is closed!!!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
              </section>
            </div>
          </template>
        </ApolloQuery>
        
        <!-- <Header msg="Test Rail QSC"/> -->
        <JiraCarousel :fixVersion="fixVersion" 
                      :milestoneId="milestoneId" 
                      :issueId="issueId"
                      :showTestStats="showTestStats"
                      :autoPlay="autoPlay"
                      :autoPlayTimeout="autoPlayTimeout"
                      />
        <Footer msg="footer"/>
      </div>
</template>

<script>
import Footer from './components/Footer.vue'
// import Header from './components/Header.vue'
import JiraCarousel from './components/JiraCarousel.vue'
import { GET_OVERALL_STATUS } from './graphql/queries/testrailQueries'

const queryParamsParser = (queryParams) => {
  if(queryParams.indexOf('?') != -1 && queryParams.length > 1 ) {
    let params = queryParams.substr(queryParams.indexOf('?') + 1).split('&')
    const paramObj = {
    }

    params.forEach((param) => {
      let nameValuePair = param.split('=')
      if(nameValuePair.length > 1) {
        let key = nameValuePair[0].trim()
        let value = nameValuePair[1].trim()
        if(key === 'autoPlay' || key === 'showTestStats') {
          value = (value == "true")? true: false;
        }

        if(key === 'autoPlayTimeout') {
          value = Number(value);
        }
        paramObj[key] = value
      } else {
        let key = nameValuePair[0].trim()
        paramObj[key] = false;
      }
      
    })
    console.log('paramObj', paramObj)
    return paramObj
  } else {
    return null
  }
}
export default {
  name: 'App',
  components: {
    // Header,
    Footer,
    JiraCarousel
  },
  data() {
    console.log('window.location.search', window.location.search)
    let fixVersion = '8.3', milestoneId = '23', issueId = 'SQA-2893';
    let paramObj = queryParamsParser(window.location.search)
    if(!paramObj) {
      paramObj = {fixVersion, milestoneId, issueId}
    }

    if(paramObj.autoPlay == null) {
      paramObj.autoPlay = true
    }

    if(!paramObj.showTestStats) {
      paramObj.showTestStats = false
    }
    if(!paramObj.autoPlayTimeout) {
      paramObj.autoPlayTimeout = 5000
    }

    if(paramObj.emptyFixVsn == null) {
      paramObj.emptyFixVsn = true
    }

    paramObj.query =  GET_OVERALL_STATUS
    paramObj.variable = {
      milestoneId: parseInt(paramObj.milestoneId),
      issueId: paramObj.issueId
    }
    console.log('param---', paramObj)
    return paramObj
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: SourceSansPro,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-variant: tabular-nums;
  font-feature-settings: tnum;
  text-align: center;
  color: hsl(202, 100%, 38%);
  background-color: hsl(202, 100%, 95%);
  margin-top: 60px;
}

.container-fluid {
    
} 

</style>
