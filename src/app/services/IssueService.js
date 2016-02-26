(function(){
  'use strict';

  angular.module('ruckApp')
    .service('IssueService', IssueService);

  IssueService.$inject = ['_'];

  function IssueService(_) {
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

    function getStages(){
      return Object.keys(vm.flow);
    }

    function processStage(stage){
      if(!stage)
        return { current: 'unstarted', next: vm.flow.unstarted };

      return { current: stage, next: vm.flow[stage] };
    }

    /**
     * Hash all the colon delimited labels
     *
     * @param  {[type]} issue [description]
     * @return {[type]}       [description]
     */
    function preprocessLabels(issue){
      _.remove(issue.labels, function(label){

        if(checkForType(issue, label, 'feature')) return true;
        if(checkForType(issue, label, 'bug')) return true;
        if(checkForType(issue, label, 'chore')) return true;

        if(/\:/.test(label)){
          var split = label.split(':')
          issue[split[0]] = split[1];
          return true;
        }
      });
    }

    function checkForType(issue, label, type) {
      if(label === type){
        issue.type = label;
        return true;
      }

      return false;
    }

    return {
      preprocessLabels: preprocessLabels,
      getStages: getStages,
      processStage: processStage
    }
  }

})();
