<template>
  <section>
        <mdb-datatable
            :data="data"
            :tfoot="false"
            responsive
            striped
            bordered
            :order="ordering"
            :pagination="pagination"
            :searching="pagination"
        />
    </section>
</template>

<script>

import { mdbDatatable } from 'mdbvue';

export default {
  name: 'jira-tickets-data-table',
  components: {
    mdbDatatable
  },
  props: ['rows', 'columns', 'ordering', 'pagination'],
  data() {
    return {
      data: {
        columns: this.columns,
        rows: this.rows,
        ordering: this.ordering,
        pagination: this.pagination?this.pagination: false
      }
    }
  }
}
</script>

