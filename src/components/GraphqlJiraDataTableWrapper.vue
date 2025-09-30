<template>
            <ApolloQuery :query="query" :variables="variables">
                <template slot-scope="{ result: { loading, error, data }, isLoading }">
                    <div class="table-responsive">
                        <section v-if="isLoading">
                            <div  class="d-flex justify-content-center" style="height: 150px;">
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
                            <div class="card custom-card-background mb-3" v-bind:class="classObject">
                                <div class="card-header" v-bind:class="classObject">
                                    <h5 class="text-left"><strong>{{title}}</strong></h5>
                                </div>
                                <div class="card-body">
                                    <jira-tickets-data-table v-if="gqlType == 'assignee-status'" :rows="data.issuesGroupedByAssignee" :columns="columns" :ordering="[1, 'desc']"/> 
                                    <jira-tickets-data-table v-if="gqlType == 'ticket-status'" :rows="data.issues" :columns="columns" :ordering="[1, 'desc']"/> 
                                    <jira-tickets-data-table v-if="gqlType == 'jql-status'" :rows="data.issuesByJql" :columns="columns" :ordering="[2, 'asc']"/> 
                                    <jira-tickets-data-table v-if="gqlType == 'jql-priority'" :rows="data.issuesGroupedByPriority" :columns="columns" :ordering="[0, 'asc']" :pagination ="false"/> 
                                </div>
                            </div>
                        </section>
                    </div>
                </template>
            </ApolloQuery>
</template>

<script>

import JiraTicketsDataTable from './JiraTicketsDataTable';
import {getGqlBasedOnName} from '../graphql/queries/testrailQueries';

const jiraTableStatusColumns = [
    {label: 'ID', field: 'key', sort: 'asc'},
    {label: 'Assignee', field: 'assignee', sort: 'asc'},
    {label: 'Priority', field: 'priority', sort: 'asc'},
    {label: 'Component', field: 'components', sort: 'asc'},
    {label: 'Description', field: 'title'},
    
]
const jiraTablePriorityColumns = [
    {label: 'Priority', field: 'priority', sort: 'asc'},
    {label: 'NEEDS REVIEW', field: 'needsreview'},
    {label: 'TO DO', field: 'todo'},
    {label: 'IN PROGRESS', field: 'inprogress'},
    {label: 'TOTAL', field: 'total'},
]        

const jiraTableAssigneesColumns = [
    {label: 'Assignee', field: 'name', sort: 'asc'},
    {label: 'NEEDS REVIEW', field: 'needsreview'},
    {label: 'TO DO', field: 'todo'},
    {label: 'IN PROGRESS', field: 'inprogress'},
    {label: 'TOTAL', field: 'total'},
]

const getColumnLabelsBasedOnType = (type, classifier) => {
    // console.log('classifer', classifier)
    if(classifier && classifier === 'ticket-status') {
        return jiraTableStatusColumns
    } else if (type == 'jql-priority') {
        return jiraTablePriorityColumns
    } else {
        return jiraTableAssigneesColumns
    }
}

export default {
  name: "GraphqlJiraDataTableWrapper",
  components: { JiraTicketsDataTable },
  props: ['gqlParams', 'title', 'gqlType', 'classifier'],
  data() {
    const obj = {
        query: getGqlBasedOnName(this.gqlType),
        variables: this.gqlParams,
        columns: getColumnLabelsBasedOnType(this.gqlType, this.classifier),
        classObject: ((this.title.toLowerCase().indexOf('bug') === -1) && (this.title.toLowerCase().indexOf('escalations') === -1))?'border-success': 'border-danger'
    } 
    // console.log('--------', obj) 
    return obj;
  }
};
</script>

<style scoped>
.description-cell-content {
    padding-left: 1rem;
}
</style>