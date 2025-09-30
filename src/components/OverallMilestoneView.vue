<template>
    <section>
        <ApolloQuery :query="query" :variables="variables">
            <template slot-scope="{ result: { loading, error, data }, isLoading }">
                <div class="row">

                    <div class="col-8" v-for="testrailQuery in testrailPieChartQueries" :key="testrailQuery.title">
                        <GraphqlTestRailChartWrapper 
                            :title="testrailQuery.title"
                            :gqlType="testrailQuery.type"
                            :gqlParams="testrailQuery.params"/>
                    </div>

                    <div class="col-4">
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
                            <div class="table-responsive">
                                <IssueComments :comments="data.issue.comments" />
                            </div>
                        </section>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
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
                                <div class="table-responsive">
                                    <IssueDescription :descriptionHeader="descriptionHeader" :descriptionContent="data.issue.description"/>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </template>
        </ApolloQuery>
    </section>
</template>
<script>

import { GET_ISSUE_BY_ID } from '../graphql/queries/testrailQueries'

import IssueComments from './IssueComments'
import IssueDescription from './IssueDescription'
import GraphqlTestRailChartWrapper from './GraphqlTestRailChartWrapper'

export default {
    name: "OverallMilestoneView",
    components: {GraphqlTestRailChartWrapper, IssueComments, IssueDescription},
    props: ['gqlParams', 'testrailPieChartQueries', 'descriptionHeader'],
    data() {
        return {
            query: GET_ISSUE_BY_ID,
            variables: this.gqlParams
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>