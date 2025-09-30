import { gql } from "apollo-boost";

export const GET_ALL_BOOKS=gql`
  query {
    books {
      title
    }
  }
`

export const GET_BOOK_BY_TITLE=gql`
  query GetBookByTitle ($title: String!) {
    book (title:$title) {
      title,
      year
    }
  }
`
export const GET_STORIES_FOR_FIX_VSN_8_3 = gql`
  query {
    issues (fixVersion: $fixVersion, issueType: "Story", status: ["In Progress", "To Do", "Needs Review", "Done"]){
          key,
          assignee,
          title,
          status,
          type
    }
  }
`
export const GET_JIRA_TICKETS_FILTERED_BY = gql`
  query GetJiraTicketsFilteredBy ($fixVersion: String!, $issueType: String!, $status: [String]!) {
    issues (fixVersion: $fixVersion, issueType: $issueType, status: $status) {
          key,
          assignee,
          title,
          status,
          type,
          priority
    }
  }
`
export const GET_JIRA_TICKETS_GROUPED_BY_ASSIGNEE = gql`
  query GetJiraTicketsGroupedByAssignee ($fixVersion: String!, $issueType: String!, $componentsToExclude: [String], $priorities: [String]) {
    issuesGroupedByAssignee (fixVersion: $fixVersion, issueType: $issueType, componentsToExclude: $componentsToExclude, priorities: $priorities) {
      name,
      inprogress,
      todo,
      needsreview
      total
    }
  }
`
export const GET_JIRA_TICKETS_GROUPED_BY_PRIORITY = gql`
  query GetJiraTicketsGroupedByPriority ($jql: String!) {
    issuesGroupedByPriority (jql: $jql) {
      priority,
      inprogress,
      todo,
      needsreview
      total
    }
  }
`

export const GET_JIRA_TICKETS_BY_JQL = gql`
  query GetIssuesByJql ($jql: String!) {
    issuesByJql (jql: $jql) {
      priority,
      key,
      title,
      assignee,
      components
    }
  }
`

export const GET_TESTRUNS_BY_MILESTONE_ID=gql`
  query GetTestRunByMilestone($milestoneId: Int!) {
    milestone (id: $milestoneId) {
      name,
      description,
      url,
      isStarted,
      isCompleted,
      testruns {
        id,
        name,
        failed_count,
        passed_count,
        retest_count,
        blocked_count,
        untested_count
        url
      }
    }
  }
`
export const GET_TESTPLANS_BY_MILESTONE_ID=gql`
  query GetTestPlanByMilestone($milestoneId: Int!) {
    milestone (id: $milestoneId) {
      name,
      description,
      url,
      isStarted,
      isCompleted,
      testplans {
        id,
        name,
        failed_count,
        passed_count,
        retest_count,
        blocked_count,
        untested_count
        url,
        description
      }
    }
  }
`
export const GET_TOTAL_RESULTS_BY_MILESTONE_ID = gql`
  query GetTotalResultsByMilestoneId($milestoneId: Int!) {
    milestone (id: $milestoneId) {
      name,
      description,
      url,
      isStarted,
      isCompleted,
      results_stats {
        failed_count,
        passed_count,
        retest_count,
        blocked_count,
        untested_count
      }
    }
  }
`

export const GET_AUTOMATION_TESTPLANS_BY_MILESTONE_ID=gql`
  query GetTestPlanByMilestone($milestoneId: Int!) {
    milestone (id: $milestoneId) {
      name,
      description,
      url,
      isStarted,
      isCompleted,
      testplans (descriptionContainsText: ["Automated regression"]) {
        id,
        name,
        failed_count,
        passed_count,
        retest_count,
        blocked_count,
        untested_count
        url
      }
    }
  }
`


export const GET_AUTOMATION_TESTRUNS_BY_MILESTONE_ID=gql`
  query GetTestRunByMilestone($milestoneId: Int!) {
    milestone (id: $milestoneId) {
      name,
      description,
      url,
      isStarted,
      isCompleted,
      testruns (descriptionContainsText: ["Please perform Regression test", ""]) {
        id,
        name,
        failed_count,
        passed_count,
        retest_count,
        blocked_count,
        untested_count
        url
      }
    }
  }
`

export const GET_AUTOMATION_TOTAL_RESULTS_BY_MILESTONE_ID = gql`
  query GetTotalResultsByMilestoneId($milestoneId: Int!) {
    milestone (id: $milestoneId) {
      name,
      description,
      url,
      isStarted,
      isCompleted,
      results_stats (descriptionContainsText: ["Automated regression", "Please perform Regression test"]){
        failed_count,
        passed_count,
        retest_count,
        blocked_count,
        untested_count
      }
    }
  }
`
export const GET_ISSUE_BY_ID = gql`
  query GetIssueById($issueId: String!) {
    issue (id: $issueId) {
      description,
    	priority,
      comments {
				createdOn,
    		createdBy,
        description
      }  
    }
  }
`

export const GET_MILESTONE_BY_ID=gql`
  query GetMilestoneById ($id: Int!) {
    milestone (id:$id) {
      name,
      description,
      isCompleted
    }
  }
`

export const GET_OVERALL_STATUS=gql`
  query GetOverallStatus ($milestoneId: Int!, $issueId: String!) {
    overallStatus (milestoneId: $milestoneId, issueId: $issueId) {
      name,
      milestoneStatus,
      issueStatus
    }
  }
`

export const GET_TESTRESULTS_WITH_TESTPLANS_BY_MILESTONE_ID=gql`
  query GetTestPlanByMilestone($milestoneId: Int!) {
    milestone (id: $milestoneId) {
      name,
      description,
      url,
      isStarted,
      isCompleted,
      testplans {
        id,
        name,
        failed_count,
        passed_count,
        retest_count,
        blocked_count,
        untested_count
        url,
        description,
        testruns {
          id,
          name,
          failed_count,
          passed_count,
          retest_count,
          blocked_count,
          untested_count
          url
        }
      }
    }
  }
`

export const getGqlBasedOnName = (name) => {
  if(name === "ticket-status") {
    return GET_JIRA_TICKETS_FILTERED_BY;
  } else if (name === "assignee-status") {
    return GET_JIRA_TICKETS_GROUPED_BY_ASSIGNEE;
  } else if (name === 'TP') {
    return GET_TESTPLANS_BY_MILESTONE_ID
  } else if (name === 'TR') {
    return GET_TESTRUNS_BY_MILESTONE_ID
  } else if (name === 'combined') {
    return GET_TOTAL_RESULTS_BY_MILESTONE_ID
  } else if (name === 'jql-priority') {
    return GET_JIRA_TICKETS_GROUPED_BY_PRIORITY
  } else if (name === 'jql-status') {
    console.log('jql-status')
    return GET_JIRA_TICKETS_BY_JQL
  } else if (name === 'ATP') {
    return GET_AUTOMATION_TESTPLANS_BY_MILESTONE_ID
  } else if (name === 'ATR') {
    return GET_AUTOMATION_TESTRUNS_BY_MILESTONE_ID
  } else if (name === 'Acombined') {
    return GET_AUTOMATION_TOTAL_RESULTS_BY_MILESTONE_ID;
  } else if (name === 'TR-inside-TP') {
    return GET_TESTRESULTS_WITH_TESTPLANS_BY_MILESTONE_ID
  } else if (name === 'overall-status') {
    return GET_OVERALL_STATUS;
  }
  return GET_ALL_BOOKS;
}