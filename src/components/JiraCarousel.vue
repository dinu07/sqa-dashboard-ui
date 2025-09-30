<template>
    <div style="margin-top:0.25rem" class="row">
        <div class="col-12">
            <carousel :perPage="1" :autoplay="autoPlay" :loop=true :autoplayTimeout="autoPlayTimeout" :paginationEnabled=true :navigationEnabled=false>
                <!-- pie chart and commentary -->
                <slide class="carousel-slide">
                    <Header :msg="slide5Header"/>
                    <div class="row">
                        <!-- <div class="col-12" v-for="testrailQuery in testrailPieChartQueries" :key="testrailQuery.title">
                            <GraphqlTestRailChartWrapper 
                                :title="testrailQuery.title"
                                :gqlType="testrailQuery.type"
                                :gqlParams="testrailQuery.params"/>
                        </div> -->
                    </div>
                    
                    <div class="row">
                        <!-- <Header :msg="slide7Header"/> -->
                        <div class="col-6" v-for="testrailQuery in testrailPieChartQueries" :key="testrailQuery.title">
                            <GraphqlTestRailChartWrapper 
                                :title="testrailQuery.title"
                                :gqlType="testrailQuery.type"
                                :gqlParams="testrailQuery.params"/>
                        </div>
                        <div class="col-6">
                                <GraphqlCommentsWrapper 
                                        :gqlParams="commentsGqlParams" 
                                        :descriptionHeader="releaseInfoHeader" />
                        </div>
                    </div>
                </slide>

                <slide class="carousel-slide">
                    <Header :msg="slide5Header"/>
                    <OverallMilestoneView :testrailPieChartQueries="testrailPieChartQueries"
                                          :descriptionHeader="releaseInfoHeader"
                                          :gqlParams="commentsGqlParams"
                    />
                </slide>
                <!-- bar charts -->
                <slide class="carousel-slide">
                    <Header :msg="slide6Header"/>
                    <div class="row">
                        <div class="col-12" v-for="testrailQuery in testrailQueries" :key="testrailQuery.title">
                            <GraphqlTestRailChartWrapper 
                                :title="testrailQuery.title"
                                :gqlType="testrailQuery.type"
                                :gqlParams="testrailQuery.params"/>
                        </div>
                    </div>
                </slide>
                <slide v-if="showTestStats === true" class="carousel-slide">
                    <Header :msg="slide8Header"/>
                    <div class="row">
                        <div class="col-12" :key="testrailTestPlansQuery.title">
                            <GraphqlTestRailDropdown
                                :label="testrailTestPlansQuery.label"
                                :defaultItem="testrailTestPlansQuery.defaultItem"
                                :title="testrailTestPlansQuery.title"
                                :gqlType="testrailTestPlansQuery.type"
                                :gqlParams="testrailTestPlansQuery.params"/>
                        </div> 
                    </div>
                </slide>
                <!-- automation stats -->
                <!--
                <slide v-if="showTestStats === true">
                    <Header :msg="testrailAutomationHeader"/>
                    <div class="row">
                        <div class="col-12" v-for="testrailQuery in testrailAutomationPieChartQueries" :key="testrailQuery.title">
                            <GraphqlTestRailChartWrapper 
                                :title="testrailQuery.title"
                                :gqlType="testrailQuery.type"
                                :gqlParams="testrailQuery.params"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6" v-for="testrailQuery in testrailAutomationQueries" :key="testrailQuery.title">
                            <GraphqlTestRailChartWrapper 
                                :title="testrailQuery.title"
                                :gqlType="testrailQuery.type"
                                :gqlParams="testrailQuery.params"/>
                        </div>
                    </div>
                </slide>
                -->
<!--
                <slide>
                    <Header :msg="sqlJiraStatusHeader"/>
                    <div class="row" v-for="jiraQuery in sqaJiraStatus" :key="jiraQuery.title">
                        <div class="col-12" >
                            <graphql-jira-data-table-wrapper 
                                    :title="jiraQuery.title"
                                    :gqlType="jiraQuery.type" 
                                    :classifier="jiraQuery.classifier"
                                    :gqlParams="jiraQuery.params" />
                        </div>
                    </div>
                </slide>
-->
                <!-- SQA Jira Status -->
                <slide class="carousel-slide">
                    <Header :msg="sqlJiraStatusHeader"/>
                    <div class="row" >
                        <div class="col-6" v-for="jiraQuery in sqaJiraStatus" :key="jiraQuery.title" >
                            <graphql-jira-data-table-wrapper 
                                    :title="jiraQuery.title"
                                    :gqlType="jiraQuery.type" 
                                    :classifier="jiraQuery.classifier"
                                    :gqlParams="jiraQuery.params" />
                        </div>
                    </div>
                </slide>

                <!-- Q-SYS bugs for Review (Component-wise) -->
                <slide class="carousel-slide">
                    <Header :msg="sqaBugsReviewComponentWiseHeader"/>
                    <div class="row" >
                        <div class="col-6" v-for="jiraQuery in sqaBugsReviewComponentWise" :key="jiraQuery.title" >
                            <graphql-jira-data-table-wrapper 
                                    :title="jiraQuery.title"
                                    :gqlType="jiraQuery.type" 
                                    :classifier="jiraQuery.classifier"
                                    :gqlParams="jiraQuery.params" />
                        </div>
                    </div>
                </slide>

                <!-- Q-SYS SQA AET and bugs for Review -->
                <slide class="carousel-slide">
                    <Header :msg="sqaAetBugsReviewHeader"/>
                    <div class="row" >
                        <div class="col-6" v-for="jiraQuery in sqaAetBugsReview" :key="jiraQuery.title" >
                            <graphql-jira-data-table-wrapper 
                                    :title="jiraQuery.title"
                                    :gqlType="jiraQuery.type" 
                                    :classifier="jiraQuery.classifier"
                                    :gqlParams="jiraQuery.params" />
                        </div>
                    </div>
                </slide>
                
    <!--
                <slide>
                    <Header :msg="slide1Header"/>
                    <div class="row">
                        <div class="col-6" v-for="jiraQuery in jiraByAssignees" :key="jiraQuery.title">
                            <graphql-jira-data-table-wrapper 
                                    :title="jiraQuery.title" 
                                    :gqlType="jiraQuery.type"
                                    :gqlParams="jiraQuery.params" />
                        </div>
                    </div>
                </slide>

                <slide>
                    <Header :msg="slide2Header"/>
                    <div class="row">
                        <div class="col-6" v-for="jiraQuery in jiraByPriorities1" :key="jiraQuery.title">
                            <graphql-jira-data-table-wrapper 
                                    :title="jiraQuery.title" 
                                    :gqlType="jiraQuery.type"
                                    :classifier="jiraQuery.classifier"
                                    :gqlParams="jiraQuery.params" />
                        </div>
                    </div>

                    
                </slide>
                    
                <slide>
                    <Header :msg="slide3Header"/>
                    <div class="row">
                        <div class="col-6" v-for="jiraQuery in jiraByPriorities2" :key="jiraQuery.title">
                            <graphql-jira-data-table-wrapper 
                                    :title="jiraQuery.title" 
                                    :gqlType="jiraQuery.type"
                                    :gqlParams="jiraQuery.params" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6" v-for="jiraQuery in jiraByPriorities3" :key="jiraQuery.title">
                            <graphql-jira-data-table-wrapper 
                                    :title="jiraQuery.title" 
                                    :gqlType="jiraQuery.type"
                                    :gqlParams="jiraQuery.params" />
                        </div>
                    </div>
                </slide>

                <slide>
                    <Header :msg="slide3Header"/>
                    <div class="row">
                        <div class="col-6" v-for="jiraQuery in jiraForP1NeedsReview1" :key="jiraQuery.title">
                            <graphql-jira-data-table-wrapper 
                                    :title="jiraQuery.title" 
                                    :gqlType="jiraQuery.type"
                                    :classifier="jiraQuery.classifier"
                                    :gqlParams="jiraQuery.params" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6" v-for="jiraQuery in jiraForP1NeedsReview2" :key="jiraQuery.title">
                            <graphql-jira-data-table-wrapper 
                                    :title="jiraQuery.title" 
                                    :classifier="jiraQuery.classifier"
                                    :gqlType="jiraQuery.type"
                                    :gqlParams="jiraQuery.params" />
                        </div>
                    </div>
                </slide>
                
        -->
                <!-- <slide>
                    <Header :msg="slide4Header"/>
                    <div class="row">
                        <div class="col-6" v-for="jiraQuery in jiraByPriorities3" :key="jiraQuery.title">
                            <graphql-jira-data-table-wrapper 
                                    :title="jiraQuery.title" 
                                    :gqlType="jiraQuery.type"
                                    :gqlParams="jiraQuery.params" />
                        </div>
                    </div>
                </slide> -->

                
                
                <!-- <slide>
                    <div class="row">
                        <div class="col-6" v-for="jiraQuery in jiraQueries" :key="jiraQuery.title">
                            <graphql-jira-data-table-wrapper 
                                    :title="jiraQuery.title" 
                                    :gqlType="jiraQuery.type"
                                    :gqlParams="jiraQuery.params" />
                        </div>
                    </div>
                </slide> -->
                <!-- <slide>
                    <Header :msg="slide7Header"/>
                    <div class="col-12">
                            <GraphqlCommentsWrapper 
                                    :gqlParams="commentsGqlParams" />
                    </div>

                </slide> -->
            </carousel>
        </div>
    </div>
</template>

<script>

import Header from './Header.vue';
import GraphqlJiraDataTableWrapper from './GraphqlJiraDataTableWrapper';
import GraphqlTestRailChartWrapper from './GraphqlTestRailChartWrapper';
import GraphqlCommentsWrapper from './GraphqlCommentsWrapper';
import GraphqlTestRailDropdown from './GraphqlTestRailDropdown';
import { Carousel, Slide } from 'vue-carousel';
import OverallMilestoneView from './OverallMilestoneView'

const BUG_TYPE = "Bug"
const STORY_TYPE = "Story"
const STATUS = ["In Progress", "To Do", "Needs Review"]


const PARAMS_FOR_STORIES = {
    fixVersion: '',
    issueType:  STORY_TYPE,
    status: STATUS
}

const PARAMS_FOR_BUGS = {
    fixVersion: '',
    issueType:  BUG_TYPE,
    status: STATUS
}

const ORDER_BY=" ORDER BY priority desc, component ASC"

const QSYS_OPEN_STORIES_JQL = ("issuetype = Story AND project = QSYSDEV AND fixVersion IN (##FIX_VSN##) AND status in ('Needs Review') AND (component is EMPTY OR component not in (Documentation, Plug-Ins))" + ORDER_BY)
const QSYS_OPEN_STOP_SHIPS_BUGS_JQL = ("issuetype = Bug AND project = QSYSDEV AND fixVersion IN (##FIX_VSN##) AND priority in (Highest, High) AND status in ('Needs Review')" + ORDER_BY)
const QSYS_OPEN_AET_ESCALATIONS_JQL=("project = QSYSDEV AND status in ('Needs Review') AND labels = AET_Escalation" + ORDER_BY)
const QSYS_BUGS_REVIEW_JQL=("(project = QSYSDEV AND issuetype = Bug AND status in ('Needs Review') AND fixVersion IN (EMPTY) AND (created >= -12w OR 'Needs Bug Review' = Yes)) AND (component not in ('Control & UI', Plug-Ins, Video, Web, LCQLN, UCI) OR component is EMPTY)" + ORDER_BY)
const QSYS_WEB_VIDEO_CTRL_UI_JQL=("(project = QSYSDEV AND issuetype = Bug AND status in ('Needs Review') AND fixVersion IN (EMPTY) AND (created >= -12w OR 'Needs Bug Review' = Yes)) AND component in (Video, 'Control & UI', Web, UCI)" + ORDER_BY)
const QSYS_PLUGINS_JQL=("(project = QSYSDEV AND issuetype = Bug AND status in ('Needs Review') AND (created >= -12w OR 'Needs Bug Review' = Yes)) AND component in (Plug-Ins)" + ORDER_BY)

const OPEN_AET_ESCALATIONS_JQL = ("project = QSYSDEV AND status in ('In Progress', 'To Do', 'Needs Review') AND labels = AET_Escalation ##APPENDER##")
const BUGS_REVIEW_JQL = ("(project = QSYSDEV AND issuetype = Bug AND status in ('In Progress', 'To Do', 'Needs Review') AND fixVersion = ##FIX_VSN## AND created >= -12w OR 'Needs Bug Review' = Yes ) AND (component not in ( Plug-Ins, Video, Web, 'Control & UI', LCQLN) OR component is EMPTY) ##APPENDER## ORDER BY priority, created DESC")
const WEB_BUGS_JQL = ("(project = QSYSDEV AND issuetype = Bug AND status in ('In Progress', 'To Do', 'Needs Review') AND fixVersion = ##FIX_VSN## AND created >= -12w OR 'Needs Bug Review' = Yes) AND component in (Web) ##APPENDER## ORDER BY created DESC")
const VIDEO_BUGS_JQL=("(project = QSYSDEV AND issuetype = Bug AND status in ('In Progress', 'To Do', 'Needs Review') AND fixVersion = ##FIX_VSN## AND created >= -12w OR 'Needs Bug Review' = Yes) AND component in (Video) ##APPENDER## ORDER BY created DESC")
const CONTROL_UI_BUGS_JQL=("(project = QSYSDEV AND issuetype = Bug AND status in ('In Progress', 'To Do', 'Needs Review') AND fixVersion = ##FIX_VSN## AND created >= -12w OR 'Needs Bug Review' = Yes) AND component in ('Control & UI', Plug-Ins, UCI) ##APPENDER## ORDER BY created DESC")

/* const QSYS_OPEN_STORIES_JQL = ("issuetype = Story AND project = QSYSDEV AND fixVersion IN (##FIX_VSN##) AND status in ('Needs Review') AND (component is EMPTY OR component not in (Documentation, Plug-Ins))" + ORDER_BY)
const QSYS_OPEN_STOP_SHIPS_BUGS_JQL = ("issuetype = Bug AND project = QSYSDEV AND fixVersion IN (##FIX_VSN##) AND priority in (Highest, High) AND status in ('Needs Review')" + ORDER_BY)
const QSYS_OPEN_AET_ESCALATIONS_JQL=("project = QSYSDEV AND status in ('Needs Review') AND labels = AET_Escalation" + ORDER_BY)
const QSYS_BUGS_REVIEW_JQL=("(project = QSYSDEV AND issuetype = Bug AND status in ('Needs Review') AND fixVersion IN (EMPTY) AND created >= -12w OR 'Needs Bug Review' = Yes) AND (component not in ('Control & UI', Plug-Ins, Video, Web, LCQLN, UCI) OR component is EMPTY)" + ORDER_BY)
const QSYS_WEB_VIDEO_CTRL_UI_JQL=("(project = QSYSDEV AND issuetype = Bug AND status in ('Needs Review') AND fixVersion IN (EMPTY) AND created >= -12w OR 'Needs Bug Review' = Yes) AND component in (Video, 'Control & UI', Web)" + ORDER_BY)
const QSYS_PLUGINS_JQL=("(project = QSYSDEV AND issuetype = Bug AND status in ('Needs Review') AND created >= -12w OR 'Needs Bug Review' = Yes) AND component in (Plug-Ins)" + ORDER_BY)


const OPEN_AET_ESCALATIONS_JQL = ("project = QSYSDEV AND status in ('In Progress', 'To Do', 'Needs Review') AND labels = AET_Escalation ##APPENDER##")
const BUGS_REVIEW_JQL = ("(project = QSYSDEV AND issuetype = Bug AND status in ('In Progress', 'To Do', 'Needs Review') AND fixVersion = ##FIX_VSN## AND created >= -12w OR 'Needs Bug Review' = Yes ) AND (component not in ( Plug-Ins, Video, Web, 'Control & UI', LCQLN) OR component is EMPTY) ##APPENDER## ORDER BY priority, created DESC")
const WEB_BUGS_JQL = ("(project = QSYSDEV AND issuetype = Bug AND status in ('In Progress', 'To Do', 'Needs Review') AND fixVersion = ##FIX_VSN## AND created >= -12w OR 'Needs Bug Review' = Yes) AND component in (Web) ##APPENDER## ORDER BY created DESC")
const VIDEO_BUGS_JQL=("(project = QSYSDEV AND issuetype = Bug AND status in ('In Progress', 'To Do', 'Needs Review') AND fixVersion = ##FIX_VSN## AND created >= -12w OR 'Needs Bug Review' = Yes) AND component in (Video) ##APPENDER## ORDER BY created DESC")
const CONTROL_UI_BUGS_JQL=("(project = QSYSDEV AND issuetype = Bug AND status in ('In Progress', 'To Do', 'Needs Review') AND fixVersion = ##FIX_VSN## AND created >= -12w OR 'Needs Bug Review' = Yes) AND component in ('Control & UI', Plug-Ins, UCI) ##APPENDER## ORDER BY created DESC")
 */
const bugs_jql_parameterized = (type, appender,fixVersion) => {
    let jql = "";
    if(type ==='WEB') {
        jql = WEB_BUGS_JQL;
    } else if (type === 'VIDEO') {
        jql = VIDEO_BUGS_JQL;
    } else if (type === 'CONTROL & UI') {
        jql = CONTROL_UI_BUGS_JQL;
    } else if (type === 'OTHERS') {
        jql = BUGS_REVIEW_JQL;
    } else if (type === 'AET') {
        jql = OPEN_AET_ESCALATIONS_JQL;
    } else if (type === 'QSYS_OPEN_STORIES_JQL') {
        jql = QSYS_OPEN_STORIES_JQL;
    } else if (type === 'QSYS_OPEN_STOP_SHIPS_BUGS_JQL') {
        jql = QSYS_OPEN_STOP_SHIPS_BUGS_JQL;
    } else if (type === 'QSYS_OPEN_STOP_SHIPS_BUGS_JQL') {
        jql = QSYS_OPEN_STOP_SHIPS_BUGS_JQL;
    } else if (type === 'QSYS_OPEN_AET_ESCALATIONS_JQL') {
        jql = QSYS_OPEN_AET_ESCALATIONS_JQL;
    } else if (type === 'QSYS_BUGS_REVIEW_JQL') {
        jql = QSYS_BUGS_REVIEW_JQL;
    } else if (type === 'QSYS_WEB_VIDEO_CTRL_UI_JQL') {
        jql = QSYS_WEB_VIDEO_CTRL_UI_JQL;
    } else if (type === 'QSYS_PLUGINS_JQL') {
        jql = QSYS_PLUGINS_JQL;
    }


    jql = jql.replace("##APPENDER##", appender)
    jql = jql.replace("##FIX_VSN##", fixVersion)
    // console.log('jql---', jql )
    return encodeURIComponent(jql);
}

const APPENDER = "AND PRIORITY in (Highest) AND status in ('Needs Review')"

export default {
  name: "JiraCarousel",
  props: {
      fixVersion: String,
      milestoneId: String,
      issueId: String,
      showTestStats: Boolean,
      autoPlay: Boolean,
      autoPlayTimeout: Number
  },
//   props: ['fixVersion', 'milestoneId', 'issueId', 'showTestStats', 'autoPlay', 'autoPlayTimeout'],
  components: { Header, GraphqlJiraDataTableWrapper, GraphqlTestRailChartWrapper, Carousel, Slide, GraphqlCommentsWrapper, GraphqlTestRailDropdown, OverallMilestoneView },
  data() {
    return {
        jiraQueries: [
            {title: "Milestone v"+ this.fixVersion+ " Stories", params: {...PARAMS_FOR_STORIES, fixVersion: this.fixVersion}, type: 'ticket-status'},
            {title: "Milestone v"+ this.fixVersion+ " Bugs", params: {...PARAMS_FOR_BUGS, fixVersion: this.fixVersion}, type: 'ticket-status'},
        ],
        jiraByAssignees: [
            {title: 'Q-SYS '+ this.fixVersion+ ' Open Stories', params: {fixVersion: this.fixVersion, issueType: STORY_TYPE, componentsToExclude: ['Documentation', 'Plug-Ins']}, type: 'assignee-status'},
            {title: 'Q-SYS '+ this.fixVersion+ ' Stop Ship Bugs', params: {fixVersion: this.fixVersion, issueType: BUG_TYPE, priorities: ['High', 'Highest']}, type: 'assignee-status'}
        ],
        testrailPieChartQueries: [
            {title: 'Q-SYS ' + this.fixVersion + ' Overall SQA Status', params: {milestoneId: parseInt(this.milestoneId)}, type: 'combined'},
        ],
        testrailQueries: [
            // {title: 'Q-SYS ' + this.fixVersion + ' Overall SQA Status', params: {milestoneId: parseInt(this.milestoneId)}, type: 'combined'},
            {title: this.fixVersion + ' SQA Test Plan Status', params: {milestoneId: parseInt(this.milestoneId)}, type: 'TP'},
            // {title: this.fixVersion + ' SQA Test Run Status', params: {milestoneId: parseInt(this.milestoneId)}, type: 'TR'},
        ],
        jiraByPriorities1: [
            {title: 'Q-Sys Open AET escalations', classifier: 'group-by-priority', type: 'jql-priority', params: {jql: bugs_jql_parameterized('AET' ,'', this.fixVersion)}},
            {title: 'Q-Sys Open AET escalations P1 Needs Review', classifier: 'ticket-status', type: 'jql-status', params: {jql: bugs_jql_parameterized('AET' ,APPENDER, this.fixVersion)}},
        ],
        jiraByPriorities2: [
            {title: 'Q-Sys Bugs for Review', classifier: 'group-by-priority', type: 'jql-priority', params: {jql: bugs_jql_parameterized('OTHERS' ,'', this.fixVersion)}},  
            {title: 'Q-Sys Web Bugs for Review', classifier: 'group-by-priority', type: 'jql-priority', params: {jql: bugs_jql_parameterized('WEB','', this.fixVersion)}},
        ],
        jiraByPriorities3: [
            {title: 'Q-Sys Video Bugs for Review', classifier: 'group-by-priority', type: 'jql-priority', params: {jql: bugs_jql_parameterized('VIDEO','', this.fixVersion)}},
            {title: 'Q-Sys Control&UI Bugs for Review', classifier: 'group-by-priority', type: 'jql-priority', params: {jql: bugs_jql_parameterized('CONTROL & UI','', this.fixVersion)}},     
        ],
        commentsGqlParams: {
            issueId: this.issueId
        },
        releaseInfoHeader:  'v' + this.fixVersion + ' features and testing',
        jiraForP1NeedsReview1: [
            {title: 'Q-Sys Bugs for Review', classifier: 'ticket-status', type: 'jql-status', params: {jql: bugs_jql_parameterized('OTHERS',APPENDER, this.fixVersion)}},  
            {title: 'Q-Sys Web Bugs for Review', classifier: 'ticket-status', type: 'jql-status', params: {jql: bugs_jql_parameterized('WEB',APPENDER, this.fixVersion)}},
        ],
        jiraForP1NeedsReview2: [
            {title: 'Q-Sys Video Bugs for Review', classifier: 'ticket-status', type: 'jql-status', params: {jql: bugs_jql_parameterized('VIDEO',APPENDER, this.fixVersion)}},
            {title: 'Q-Sys Control&UI Bugs for Review', classifier: 'ticket-status', type: 'jql-status', params: {jql: bugs_jql_parameterized('CONTROL & UI',APPENDER, this.fixVersion)}},     
        ],
        slide1Header: this.fixVersion + " Release overview",
        slide2Header: "Q-SYS Open priority bugs",
        slide3Header: "Open Web and Video bugs",
        slide4Header: "Open Control & UI bugs",
        slide5Header: "Q-SYS " + this.fixVersion + ": SQA Testing Status",
        slide6Header: "Q-SYS " + this.fixVersion + ": SQA Test Plan Overview",
        slide7Header: "Q-SYS " + this.fixVersion + ": Release SQA Remarks",

        sqaJiraStatus: [
            {title: 'Q-SYS '+ this.fixVersion+ ' Open Stories (Needs Review)', classifier: 'ticket-status', type: 'jql-status', params: {jql: bugs_jql_parameterized('QSYS_OPEN_STORIES_JQL',"", this.fixVersion)}},
            {title: 'Q-SYS '+ this.fixVersion+ ' Stop Ship Bugs (Needs Review)', classifier: 'ticket-status', type: 'jql-status', params: {jql: bugs_jql_parameterized('QSYS_OPEN_STOP_SHIPS_BUGS_JQL',"", this.fixVersion)}}
        ],
        sqlJiraStatusHeader: "Q-SYS " + this.fixVersion + ": SQA JIRA Status",

        sqaAetBugsReview: [
            {title: 'Q-SYS Open AET escalations (Status: Needs Review & fixVersion: EMPTY)', classifier: 'ticket-status', type: 'jql-status', params: {jql: bugs_jql_parameterized('QSYS_OPEN_AET_ESCALATIONS_JQL',"", this.fixVersion)}},
            {title: 'Q-SYS Plug-In bugs (Status: Needs Review & fixVersion: EMPTY)', classifier: 'ticket-status', type: 'jql-status', params: {jql: bugs_jql_parameterized('QSYS_PLUGINS_JQL',"", this.fixVersion)}},
        ],
        sqaAetBugsReviewHeader: "Q-SYS NON-" + this.fixVersion + ": AET and Plug-In bugs for Review",

        sqaBugsReviewComponentWise: [
            {title: 'Q-SYS Web, Video, Control & UI, LCQLN and UCI bugs (Status: Needs Review & fixVersion: EMPTY)', classifier: 'ticket-status', type: 'jql-status', params: {jql: bugs_jql_parameterized('QSYS_WEB_VIDEO_CTRL_UI_JQL',"", this.fixVersion)}},
            {title: 'Q-SYS Other Open bugs (Status: Needs Review & fixVersion: EMPTY)', classifier: 'ticket-status', type: 'jql-status', params: {jql: bugs_jql_parameterized('QSYS_BUGS_REVIEW_JQL',"", this.fixVersion)}},
        ],
        sqaBugsReviewComponentWiseHeader: "Q-SYS NON-" + this.fixVersion + ": Component-wise bugs for Review",

        testrailAutomationHeader: "Q-SYS Automation Statistics",
        testrailAutomationQueries: [
            {title: this.fixVersion + ' SQA Automation Test Plan Status', params: {milestoneId: parseInt(this.milestoneId)}, type: 'ATP'},
            {title: this.fixVersion + ' SQA Automation Test Run Status', params: {milestoneId: parseInt(this.milestoneId)}, type: 'ATR'},
        ],
        testrailAutomationPieChartQueries: [
            {title: 'Q-SYS ' + this.fixVersion + 'Overall Automation SQA Status', params: {milestoneId: parseInt(this.milestoneId)}, type: 'Acombined'},
        ],
        slide8Header: "Q-SYS " + this.fixVersion + ": SQA Test Run Statistics",
        testrailTestPlansQuery: {
            label: 'Choose test plan',
            defaultItem: '--Select test plan--',
            title: this.fixVersion + ' SQA Test Plans',
            type: 'TR-inside-TP',
            params: {milestoneId: parseInt(this.milestoneId)}
        }
    }
  }
};
</script>

<style scoped>
.carousel-slide {
    overflow: hidden;
    padding: 5px;
}
</style>
