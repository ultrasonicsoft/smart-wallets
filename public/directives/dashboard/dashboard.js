'use strict';

mainApp.controller('DashboardCtrl', function ($scope, $timeout, $mdDialog, $rootScope,
     $location, $http, $mdSidenav, $log, loginService, dataService) {
    
    var self = this;
    self.tags = [];
    self.showSearchSection = false;
    self.showTags = false;
    self.myData = [];
    self.selectedDocumentTags = [];
    self.loggedInUser = null;
    self.isAdmin = false;
    self.approverComments = null;
    self.selectedDocId = -1;
        
    self.gridOptions = {
        enableFiltering: true,
        showGridFooter: true,
        enableGridMenu: true,
        enableSelectAll: true,
        multiSelect: false,
        exporterCsvFilename: 'myFile.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [10, 10, 10, 10] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Lawyer Document Store", style: 'headerStyle' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
            return docDefinition;
        },
        exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            self.gridApi = gridApi;
        },
        columnDefs: [
            { name: 'id', field: 'id', width: 50 },
            { name: 'Expert F.Name', field: 'Expert_FName', width: '*' },
            { name: 'Expert L.Name', field: 'Expert_LName', width: '*' },
            { name: 'Plt/Def', field: 'plt/def', width: 80 },
            { name: 'Lawyer F.Name', field: 'Lawyer_FName', width: '*' },
            { name: 'Lawyer L.Name', field: 'Lawyer_LName', width: '*' },
            { name: 'jurisdiction', field: 'jurisdiction', width: '*' },
            { name: 'Date Taken', field: 'dateTaken', width: '*' },
            { name: 'Frmt', field: 'format', visible: false, width: 60 },
            { name: 'Status', field: 'status' },
            { name: 'Case Type', field: 'caseType' },
            { name: 'Lawyer Comments', field: 'lawyerComments' },
            { name: 'Approval Comments', field: 'approverComments', visible: false },
            { name: 'Approver', field: 'approver', visible: false },
            { name: 'Approved On', field: 'approvedOn', visible: false },
            { name: 'Tag1', field: 'tag1', visible: false },
            { name: 'Tag2', field: 'tag2', visible: false },
            { name: 'Tag3', field: 'tag3', visible: false },
            { name: 'Tag4', field: 'tag4', visible: false },
            { name: 'Tag5', field: 'tag5', visible: false },
            {
                name: 'Dwn',
                cellTemplate: '<md-button ng-href="/download/{{row.entity.id}}{{row.entity.format}}" ' +
                    'target="_self" class="md-fab md-mini" aria-label="Download"> ' +
                    '<md-icon md-svg-src="assets/img/icons/ic_file_download_black_24px.svg"></md-icon> ' +
                    '<md-tooltip>Download File</md-tooltip> </md-button>',
                width: 60
            },
            {
                name: 'Approve',
                cellTemplate: '<md-button class="md-fab md-mini" ' +
                    'aria-label="Approve" ng-click="grid.appScope.approveSelectedDocument($event, row.entity.id)"' +
                    'ng-if="row.entity.status==\'Pending\'"> ' +
                    '<md-icon md-svg-src="assets/img/icons/ic_spellcheck_black_24px.svg"></md-icon> ' +
                    '<md-tooltip>Approve Document</md-tooltip>' +
                    ' </md-button>',
                width: 60
            }
        ],
        rowHeight: 50, 
        data: self.myData
    };
    
    self.gridOptions.onRegisterApi = function (gridApi) {
        self.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            self.selectedDocId = row.entity.id;
            self.selectedDocumentTags = [];
            if (row.entity.tag1 != 'undefined')
                self.selectedDocumentTags.push(row.entity.tag1);
            if (row.entity.tag2 != 'undefined')
                self.selectedDocumentTags.push(row.entity.tag2);
            if (row.entity.tag3 != 'undefined')
                self.selectedDocumentTags.push(row.entity.tag3);
            if (row.entity.tag4 != 'undefined')
                self.selectedDocumentTags.push(row.entity.tag4);
            if (row.entity.tag5 != 'undefined')
                self.selectedDocumentTags.push(row.entity.tag5);
        });
    };
    
    function showAdvanced(ev) {
        $mdDialog.show({
            controller: 'uploadDocumentCtrl',
            templateUrl: 'directives/upload-document/upload-document.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
        })
            .then(function (answer) {
        }, function () {
        });
    }
    
    self.showAdvanced = showAdvanced;
    
    function searchDocumentsByTags() {
        //$http({
        //    url: '/logout', 
        //    method: "POST"
        //}).success(function (data) {
        //    alert('logged out');
        //}).error(function () {
        //    alert('error');
        //});
        
        $http({
            url: '/searchDocuments', 
            method: "GET",
            params: { tags: self.tags }
        }).success(function (data) {
            self.myData = data [0];
            self.gridOptions.data = self.myData;

        }).error(function () {
            alert('error');
        });
    }
    
    function getAllDocuments() {
        $http.get('/getAllDocuments').success(function (data) {
            self.myData = data[0];
            self.gridOptions.data = self.myData;
        }).error(function () {
            alert('error');
        });
    }
    
    $scope.approveSelectedDocument = function (ev, docId) {
        dataService.setSelectedDocId(docId);
        $mdDialog.show({
            templateUrl: 'directives/approve-document/approve-document.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            controller: 'approveDocumentCtrl'
        })
            .then(function () {
            self.getAllDocuments();
        }, function () {
        });

    }
    
    function setLoggedInUser() {
        self.loggedInUser = loginService.get();
        self.isAdmin = loginService.isAdmin();
        
        var pos = self.gridOptions.columnDefs.map(function (e) { return e.name; }).indexOf('Approve');
        if (self.isAdmin === 0) {
            self.gridOptions.columnDefs.splice(pos);
        }
        //self.gridOptions.columnDefs[pos].visible = self.isAdmin === 1 ? true:false;
 
    }
    
    
    function updateDocumentTags() {
        $http.post('/updateDocumentTags', { docId: self.selectedDocId, tags:self.selectedDocumentTags })
            .success(function (user) {
            self.getAllDocuments();
        })
            .error(function () {
            alert('error');
        });
    }
    
    function refreshDocuments() {
        self.getAllDocuments();
    }
    var unbind = $rootScope.$on('refreshGridDataEvent', function () {
        self.getAllDocuments();
    });
    
    $rootScope.$on('$destroy', unbind);
    
    self.getAllDocuments = getAllDocuments;
    self.searchDocumentsByTags = searchDocumentsByTags;
    self.setLoggedInUser = setLoggedInUser;
    self.updateDocumentTags = updateDocumentTags;
    self.refreshDocuments = refreshDocuments;
    
    
    self.setLoggedInUser();
    self.getAllDocuments();
});