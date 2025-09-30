<template>
  <section>
    <div class="row test-plan-dropdown-wrapper">
      <div class="col-2" style="margin-top: 1rem">
          <h5>{{label}}</h5>
      </div>
      <div class="col-10 text-left">
          <div class="dropdown">
            
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{buttonLabel}}
            </button>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" @click="onItemSelection($event)" v-for="item in items" :key="item.id">
                {{item.name}}
                <p class="hidden-id">{{item.id}}</p>
              </a>
            </div>
          </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
              <div class="card-body">
                <div v-if="computedTestPlanDesc">
                  <h6 class="card-subtitle mb-2 text-left font-weight-bold">{{computedTestPlanDescLbl}}</h6>
                  <p class="card-text text-left" style="margin-left: 1rem" v-html="computedTestPlanDesc"/>
                </div>
                <div style="margin-top: 1rem">
                  <h6 class="card-subtitle mb-2 text-left font-weight-bold">TestRun stats</h6>
                  <TestRailChart1 :chart-data="computedChartData" style="height: 200px"/>
                  <ChartFooter/>
                </div>
              </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>


// import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle } from 'mdbvue';
import TestRailChart1 from './TestRailChart1'
import {transformBarChartFunction} from '../testrail-chart'
import ChartFooter from './ChartFooter'
import 'bootstrap/dist/js/bootstrap.bundle'

export default {
  name: "TestRailDropdown",
  components: {TestRailChart1, ChartFooter},
  props: ['items', 'toggleItem', 'label'],
  data() {
    return {
      selectedLabel: (this.items && this.items.length)? this.items[0].id: null,
      buttonLabel: (this.items && this.items.length)? this.items[0].name: this.toggleItem
    }
  },
  computed: {
    computedTestRun: function() {
      const testplan = this.computedItem()
      return testplan?testplan.testruns:null
    },
    computedChartData: function() {
      const item = this.computedItem()
      return transformBarChartFunction(item, 'TR')
    },
    computedTestPlanDescLbl: function() {
      const testplan = this.computedItem()
      return testplan.name + ": Features"
    },
    computedTestPlanDesc: function() {
      const testplan = this.computedItem()
      const desc = testplan && testplan.description?testplan.description:''
      // console.log('desc--', desc)
      const htmlDesc= desc.split("\n").join('<br>')
      // console.log('htmlDesc--', htmlDesc)
      return htmlDesc
    }
  },
  methods: {
    onItemSelection(event) {
      // get the name
      // const val = event.currentTarget.text
      const val = event.currentTarget.children[0].innerText
      // console.log('val--', val)
      this.selectedLabel = val;

      // set the button label manually
      event.currentTarget.parentElement.parentElement.firstElementChild.innerText=event.currentTarget.innerText;

      // console.log('items---', this.items)
      // const id = this.items.find((item) => item.name === val);
      // console.log('id--' + id)
      
    },
    computedItem() {
      // console.log('items', this.items)
      const testplan = this.items.find((i) => this.selectedLabel == i.id)
      // console.log('testplan', testplan)
      return testplan
    },
  }
}
</script>
<style scoped>

.dropdown {
  position: absolute;
  
}

.btn-dark.dropdown-toggle{
 
}

.dropdown-menu {
    top: 0!important;
    position: absolute!important;
    background-color: hsl(202, 100%, 38%);
}

.test-plan-dropdown-wrapper {
  margin-bottom: 2rem;
}
.hidden-id {
  display: none;
}
</style>