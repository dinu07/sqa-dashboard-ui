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
              <div class="card border-info mb-3">
                <!--
                <div class="card-header">
                    <h5 class="text-left"><strong>{{title}}</strong></h5>
                </div>
                -->
                <div class="card-body justify-content-center">
                    <TestRailDropdown :items="sortTesplans(data.milestone)" :toggleItem="defaultItem" :label="label"/>
                </div>
              </div>             
            </section>
        </div>
    </template>
  </ApolloQuery>
</template>

<script>


import { getGqlBasedOnName } from '../graphql/queries/testrailQueries'
import  TestRailDropdown from './TestRailDropDown';



export default {
  name: "GraphqlTestRailDropdown",
  components: {TestRailDropdown},
  props: ['title','gqlType','gqlParams','defaultItem', 'label'],
  data() {
    return {
      query: getGqlBasedOnName(this.gqlType),
      variables: this.gqlParams
    }
  },
  methods: {
    sortTesplans: (milestone) => {
      if(milestone && milestone.testplans) {
          const tp = milestone.testplans;
          tp.sort((e1,e2)=> e1.name.localeCompare(e2.name))
          return tp;
      }
      return null;
    }
  }
}
</script>
<style scoped>
/* .dropdown {
  font-size: 6rem;
} */
</style>