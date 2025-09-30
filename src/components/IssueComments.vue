<template>
    <section v-if="comments">
        <div class="card border-0 mb-3">
            <div class="card-header">
                <h5 class="text-left"><strong>SQA Team Remarks</strong></h5>
            </div>
            <div class="card-body">
                <div class="list-group">
                    <div v-for="comment in comments" :key= "comment.createdOn" class="list-group-item list-group-item-action border-light border-top">
                        <div class="d-flex w-100 justify-content-between">
                        </div>
                        <p class="mb-1 comment-desc" v-html="comment.description"/>
                        <small class="text-muted">- {{comment.createdBy}} ({{comment.createdOn}}) </small>
                    </div>
                </div>
            </div>
        </div> 
    </section>
</template>
<script>
export default {
    name: "IssueComments",
    props: {
        comments: Array
    }
}
</script>
<style scoped>
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