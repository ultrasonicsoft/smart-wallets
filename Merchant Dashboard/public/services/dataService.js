angular.module('myApp').service('dataService', function () {
    var selectedDocId = -1;
    
    function setSelectedDocId(docId) {
        selectedDocId = docId;
    }
    function getSelectedDocId() {
        return selectedDocId;
    }
    
    return {
        setSelectedDocId: setSelectedDocId,
        getSelectedDocId: getSelectedDocId
    }

});