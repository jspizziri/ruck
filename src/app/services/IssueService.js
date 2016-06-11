(function(){
  'use strict';

  angular.module('ruckApp')
    .service('IssueService', IssueService);

  IssueService.$inject = ['$log', '_', 'IssueResource'];

  function IssueService($log, _, IssueResource) {
    var vm = this;

    vm.stages = {
      started: { name: 'started', button: 'Start' },
      finished: { name: 'finished', button: 'Finish' },
      delivered: { name: 'delivered', button: 'Deliver' },
      rejected: { name: 'rejected', button: 'Reject' },
      accepted: { name: 'accepted', button: 'Accept' }
    }

    vm.flow = {
      unstarted: [vm.stages.started],
      started: [vm.stages.finished],
      finished: [vm.stages.delivered],
      delivered: [vm.stages.rejected, vm.stages.accepted],
      rejected: [vm.stages.started],
      accepted: []
    };

    vm.points = [1, 2, 3];
    vm.types = ['feature', 'chore', 'bug'];

    function applyUpdate(issue, addSpinner){

      var update = getUpdate(issue);

      $log.log("Updating issue: "+ JSON.stringify(update));

      if(addSpinner === true) issue.isUpdating = true;
      return IssueResource.update(update).$promise
        .then(function(result){
          $log.log(result);
          issue.isUpdating = false;
          return result;
        });
    }

    /**
     *
     */
    function getUpdate(issue){

      var update = {
        id: issue.project_id,
        issue_id: issue.id
      };

      if(issue.title) update.title = issue.title;
      if(issue.description) update.description = issue.description;
      if(issue.assignee) update.assignee_id = issue.assignee.id;
      if(issue.milestone) update.milestone_id = issue.milestone.id;
      if(issue.stage == 'accepted' || issue.close) update.state_event = 'close';
      if(issue.stage !== 'accepted' && issue.state !== 'opened')  update.state_event = 'reopen';

      var labels = processLabels(issue);

      if(labels) update.labels = labels;

      return update;
    }

    /**
     * Traverse to the next stage in the process
     *
     * @param  {[type]} stage [description]
     * @return {[type]}       [description]
     */
    function processStage(stage){
      if(!stage)
        return { current: 'unstarted', next: vm.flow.unstarted };

      return { current: stage, next: vm.flow[stage] };
    }

    function processLabels(issue){
      // process labels
      var labels = [];

      if(issue.stage) labels.push('stage:'+issue.stage);
      if(issue.points) labels.push('points:'+issue.points);
      if(issue.type) labels.push(issue.type);
      if(issue.list) labels.push('list:'+issue.list);
      if(!isNaN(issue.priority)) labels.push('priority:'+issue.priority);

      // Flatten labels
      if(labels.length) return labels.join(',');

      return null;
    }

    function preprocessIssues(issues){
      issues.forEach(function(issue){
        preprocessLabels(issue);
        issue.isCollapsed = true;
        if(!issue.stage)
          issue.stage = processStage().current
      });

      return issues;
    }

    /**
     * Hash all the colon delimited labels
     *
     * @param  {[type]} issue [description]
     * @return {[type]}       [description]
     */
    function preprocessLabels(issue){
      _.remove(issue.labels, function(label){

        // Check for type label
        var isType = _.some(vm.types, function(type){
          return checkForType(issue, label, type);
        });

        if(isType) return true;

        if(/\:/.test(label)){
          var split = label.split(':');
          var key = split[0];
          var value = split[1];

          // Parse any numbers
          if(!isNaN(value))
            value = parseInt(value, 10);

          issue[key] = value;
          return true;
        }
      });
    }

    /**
     * Test a label to determine if it's a 'type' label
     *
     * @param  {[type]} issue [description]
     * @param  {[type]} label [description]
     * @param  {[type]} type  [description]
     * @return {[type]}       [description]
     */
    function checkForType(issue, label, type) {
      if(label === type){
        issue.type = label;
        return true;
      }

      return false;
    }

    /**
     * Return an array of story 'types'
     * @return {Array} array of story 'types'
     */
    function getTypes(){
      return vm.types;
    }

    /**
     * Return a flattened array of stages
     * @return {Array} a flattened array of stages
     */
    function getStages(){
      return Object.keys(vm.flow);
    }

    /**
     * Get the point option values
     * @return {Array} array of integer points
     */
    function getPoints(){
      return vm.points;
    }

    return {
      applyUpdate: applyUpdate,
      processLabels: processLabels,
      preprocessLabels: preprocessLabels,
      preprocessIssues: preprocessIssues,
      getStages: getStages,
      processStage: processStage,
      getTypes: getTypes,
      getPoints: getPoints,
      getUpdate: getUpdate
    }
  }

})();
