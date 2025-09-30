<template>
  <ApolloQuery :query="query" :variables="variables">
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
              <IssueDescription :descriptionHeader="descriptionHeader" :descriptionContent="data.issue.description"/>
              <IssueComments :comments="data.issue.comments" />
            </section>
        </div>
    </template>
  </ApolloQuery>
</template>

<script>

import { GET_ISSUE_BY_ID } from '../graphql/queries/testrailQueries'
import IssueDescription from './IssueDescription'
import IssueComments from './IssueComments'
// import GraphqlTestRailChartWrapper from './GraphqlTestRailChartWrapper';

export default {
  name: "GraphqlCommentsWrapper",
  components: { IssueDescription, IssueComments },
  props: ['gqlParams', 'fixVersion', 'milestoneId', 'descriptionHeader'],
  data() {
    return {
      query: GET_ISSUE_BY_ID,
      variables: this.gqlParams
    }
  }
}
</script>

<style scoped>
  .card {
    margin-top: 2rem;
  }

  .card-text {
    text-align: left;
  }

  .list-group-item {
    margin-top: 0.5rem;
  }

  .list-group {
    text-align: left;
    margin-left: -1rem;
    margin-top: -1rem;
  }

  /* .comment-desc {
    padding: .5rem 0;
    font-size: 1.25rem;
  } */
</style>