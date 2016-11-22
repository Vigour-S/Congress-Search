$(document).ready(function () {
    $(".push_menu").click(function () {
        $(".wrapper").toggleClass("active");
    });
});
/////////////////////
var url1 = "index.php?legislators=true";
var url2 = "index.php?egislators=true&bioguide_id=";
var url3 = "index.php?committees=";
var url4 = "index.php?bills=";
var url5 = "index.php?house=true";
var url6 = "index.php?senate=true";
var url7 = "index.php?allbills=true";
var url8 = "index.php?bill_details=";
var url9 = "index.php?allhousecommittees=true";
var url10 = "index.php?allsenatecommittees=true";
var url11 = "index.php?alljointcommittees=true";
////////////////////
var app = angular.module("mymodule", ['angularUtils.directives.dirPagination', 'ui.codemirror']);
id = "";
app.controller("data", function ($scope, $http) {
    $http.get(url1).then(function (response) {
        $scope.total = response.data.count;
        $scope.population = legislator(response.data.results);
        $scope.showItemId = function (value) {
            id = value.bioguide_id;
            //personal information
            var url = url2 + id;
            $http.get(url).then(function (response) {
                $scope.mydata = details(value);
            });
            //committees
            var url = url4 + id;
            $http.get(url).then(function (response) {
                $scope.committes = response.data.results;
            });
            //bills
            var url = url4 + id;
            $http.get(url).then(function (response) {
                $scope.bills = response.data.results;
            });            
            
        };
        $scope.starcontrol = function (value) {
            if (value.active == "active") {
                value.active = "inactive";
                localStorage.removeItem(value.bioguide_id);
                
            }
            else {
                value.active = "active";
                localStorage.setItem(value.bioguide_id, JSON.stringify(value));
            }
        }
    });
    //house
    $http.get(url5).then(function (response) {
        $scope.house = legislator(response.data.results);
    });
    //senate
    $http.get(url6).then(function (response) {
        $scope.senate = legislator(response.data.results);
    });
    
    $scope.$on('refresh_leg', function() {
            $.each($scope.population, function (index, value) {
            if (localStorage.getItem(value.bioguide_id) != null) {
                value.active = "active";
            }
            else {
                value.active = "inactive";
            }});
        });
});

function legislator(data) {
    $.each(data, function (index, value) {
        if (value.party == 'R') {
            value.party = 'Republican';
            value.p_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/r.png';
        }
        else if (value.party == 'D') {
            value.party = 'Democrat';
            value.p_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/d.png';
        }
        else {
            console.log(value.party);
        }
        if (value.chamber == 'house') {
            value.chamber_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/h.png';
        }
        else if (value.chamber == 'senate') {
            value.chamber_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/s.svg';
        }
        else {
            console.log(value.chamber);
        }
        if (value.district == null) {
            value.district = "N.A.";
        }
        else {
            value.district = "District" + value.district;
        }
        value.state = value.state_name;
    });
    return data;
}

function details(data) {
    if (data.oc_email == null) {
        data.oc_email = "N.A.";
    }
    if (data.fax == null) {
        data.fax = "N.A.";
    }
    var today = new Date();
    var start = new Date(data.term_start);
    var end = new Date(data.term_end);
    var duration = (end.getTime() - start.getTime()) / 86400000;
    var past = (today.getTime() - start.getTime()) / 86400000;
    data.progress = Math.floor(past / duration * 100);
    data.state = data.state_name;
    data.twitter = 'https://twitter.com/' + data.twitter_id;
    data.facebook = 'https://www.facebook.com/' + data.facebook_id;
    if (localStorage.getItem(data.bioguide_id) != null) {
        data.active = "active";
    } else {
        data.active = "inactive";
    }
    return data;
}

function convert_state(name) {
    var name = name.toUpperCase();
    var states = new Array({
        'name': 'Alabama'
        , 'abbrev': 'AL'
    }, {
        'name': 'Alaska'
        , 'abbrev': 'AK'
    }, {
        'name': 'American Samoa'
        , 'abbrev': 'AS'
    }, {
        'name': 'Arizona'
        , 'abbrev': 'AZ'
    }, {
        'name': 'Arkansas'
        , 'abbrev': 'AR'
    }, {
        'name': 'California'
        , 'abbrev': 'CA'
    }, {
        'name': 'Colorado'
        , 'abbrev': 'CO'
    }, {
        'name': 'Connecticut'
        , 'abbrev': 'CT'
    }, {
        'name': 'Delaware'
        , 'abbrev': 'DE'
    }, {
        'name': 'Florida'
        , 'abbrev': 'FL'
    }, {
        'name': 'Georgia'
        , 'abbrev': 'GA'
    }, {
        'name': 'Hawaii'
        , 'abbrev': 'HI'
    }, {
        'name': 'Idaho'
        , 'abbrev': 'ID'
    }, {
        'name': 'Illinois'
        , 'abbrev': 'IL'
    }, {
        'name': 'Indiana'
        , 'abbrev': 'IN'
    }, {
        'name': 'Iowa'
        , 'abbrev': 'IA'
    }, {
        'name': 'Kansas'
        , 'abbrev': 'KS'
    }, {
        'name': 'Kentucky'
        , 'abbrev': 'KY'
    }, {
        'name': 'Louisiana'
        , 'abbrev': 'LA'
    }, {
        'name': 'Maine'
        , 'abbrev': 'ME'
    }, {
        'name': 'Maryland'
        , 'abbrev': 'MD'
    }, {
        'name': 'Massachusetts'
        , 'abbrev': 'MA'
    }, {
        'name': 'Michigan'
        , 'abbrev': 'MI'
    }, {
        'name': 'Minnesota'
        , 'abbrev': 'MN'
    }, {
        'name': 'Mississippi'
        , 'abbrev': 'MS'
    }, {
        'name': 'Missouri'
        , 'abbrev': 'MO'
    }, {
        'name': 'Montana'
        , 'abbrev': 'MT'
    }, {
        'name': 'Nebraska'
        , 'abbrev': 'NE'
    }, {
        'name': 'Nevada'
        , 'abbrev': 'NV'
    }, {
        'name': 'New Hampshire'
        , 'abbrev': 'NH'
    }, {
        'name': 'New Jersey'
        , 'abbrev': 'NJ'
    }, {
        'name': 'New Mexico'
        , 'abbrev': 'NM'
    }, {
        'name': 'New York'
        , 'abbrev': 'NY'
    }, {
        'name': 'North Carolina'
        , 'abbrev': 'NC'
    }, {
        'name': 'North Dakota'
        , 'abbrev': 'ND'
    }, {
        'name': 'Ohio'
        , 'abbrev': 'OH'
    }, {
        'name': 'Oklahoma'
        , 'abbrev': 'OK'
    }, {
        'name': 'Oregon'
        , 'abbrev': 'OR'
    }, {
        'name': 'Pennsylvania'
        , 'abbrev': 'PA'
    }, {
        'name': 'Rhode Island'
        , 'abbrev': 'RI'
    }, {
        'name': 'South Carolina'
        , 'abbrev': 'SC'
    }, {
        'name': 'South Dakota'
        , 'abbrev': 'SD'
    }, {
        'name': 'Tennessee'
        , 'abbrev': 'TN'
    }, {
        'name': 'Texas'
        , 'abbrev': 'TX'
    }, {
        'name': 'Utah'
        , 'abbrev': 'UT'
    }, {
        'name': 'Vermont'
        , 'abbrev': 'VT'
    }, {
        'name': 'Virginia'
        , 'abbrev': 'VA'
    }, {
        'name': 'Washington'
        , 'abbrev': 'WA'
    }, {
        'name': 'West Virginia'
        , 'abbrev': 'WV'
    }, {
        'name': 'Wisconsin'
        , 'abbrev': 'WI'
    }, {
        'name': 'Wyoming'
        , 'abbrev': 'WY'
    });
    var returnthis = false;
    $.each(states, function (index, value) {
        if (value.abbrev == name) {
            returnthis = value.name;
            return returnthis;
        }
    });
    return returnthis;
}
////////////////////bills
app.controller("bills", function ($scope, $http) {
    $http.get(url7).then(function (response) {
        $scope.active_bills = active_bills(response.data.results);
        $scope.new_bills = new_bills(response.data.results);
        $scope.showbilldetails = function (bill) {
            //personal information
//            var url = url8 + bill_id + '&chamber_type=' + chamber_type;
//            $http.get(url).then(function (response) {
//                $scope.bill_details = bill_details(response.data.results[0]);
//            });
        $scope.bill_details = bill_details(bill);
        };
        $scope.starcontrol = function (value) {
            if (value.active == "active") {
                value.active = "inactive";
                localStorage.removeItem(value.bill_id);
            }
            else {
                value.active = "active";
                localStorage.setItem(value.bill_id, JSON.stringify(value));
            }
        };
        $scope.$on('refresh_bill', function() {
            $.each($scope.active_bills, function (index, value) {
            if (localStorage.getItem(value.bill_id) != null) {
                value.active = "active";
            }
            else {
                value.active = "inactive";
            }});
            $.each($scope.new_bills, function (index, value) {
            if (localStorage.getItem(value.bill_id) != null) {
                value.active = "active";
            }
            else {
                value.active = "inactive";
            }
            });
        });
            
    });
});

function active_bills(data) {
    var i = 0;
    var active_bills = new Array();
    $.each(data, function (index, value) {
        if (value.history.active == false) {
            active_bills[i] = value;
            active_bills[i].sponsor = value.sponsor.title + ". " + value.sponsor.last_name + ", " + value.sponsor.first_name;
            if (value.chamber == 'house') {
                active_bills[i].chamber_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/h.png';
            }
            else if (value.chamber == 'senate') {
                active_bills[i].chamber_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/s.svg';
            }
            else {
                console.log(value.chamber);
            }
            i++;
        }
    })
    return active_bills;
}

function new_bills(data) {
    var i = 0;
    var new_bills = new Array();
    $.each(data, function (index, value) {
        if (value.history.active == true) {
            new_bills[i] = value;
            new_bills[i].sponsor = value.sponsor.title + ". " + value.sponsor.last_name + ", " + value.sponsor.first_name;
            if (value.chamber == 'house') {
                new_bills[i].chamber_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/h.png';
            }
            else if (value.chamber == 'senate') {
                new_bills[i].chamber_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/s.svg';
            }
            else {
                console.log(value.chamber);
            }
            i++;
        }
    })
    return new_bills;
}

function bill_details(data) {
    if (data.history.active == false) {
        data.status = "NEW";
    }
    else {
        data.status = "ACTIVE";
    }

    try {
        data.version_status = data.last_version.version_name;
    }
    catch (e) {
        data.version_status = "N.A."
        console.log(e)
    }
    data.congress_url = data.urls.congress;
    try {
        data.bill_url = data.last_version.urls.pdf;
    }
    catch (e) {
        console.log(e)
    }
    
    if (localStorage.getItem(data.bill_id) != null) {
        data.active = "active";
    } else {
        data.active = "inactive";
    }
    return data;
}
/////////////////////////////////committees
app.controller("committees", function ($scope, $http) {
    $http.get(url9).then(function (response) {
        $scope.house_committees = house(response.data.results);
    });
    $http.get(url10).then(function (response) {
        $scope.senate_committees = senate(response.data.results);
    });
    $http.get(url11).then(function (response) {
        $scope.joint_committees = joint(response.data.results);
    });
    $scope.$on('refresh_com', function () {
        $.each($scope.house_committees, function (index, value) {
            if (localStorage.getItem(value.committee_id) != null) {
                value.active = "active";
            }
            else {
                value.active = "inactive";
            }
        });
        $.each($scope.senate_committees, function (index, value) {
            if (localStorage.getItem(value.committee_id) != null) {
                value.active = "active";
            }
            else {
                value.active = "inactive";
            }
        });
        $.each($scope.joint_committees, function (index, value) {
            if (localStorage.getItem(value.committee_id) != null) {
                value.active = "active";
            }
            else {
                value.active = "inactive";
            }
        });
    });
    $scope.starcontrol = function (value) {
        if (value.active == "active") {
            value.active = "inactive";
            localStorage.removeItem(value.committee_id);
        }
        else {
            value.active = "active";
            localStorage.setItem(value.committee_id, JSON.stringify(value));
        }
    }
});

function house(data) {
    var i = 0;
    var committees = new Array();
    $.each(data, function (index, value) {
        if (value.chamber == "house") {
            if (value.office == null) {
                value.office = "N.A.";
            }
            if (value.parent_committee_id == null) {
                value.parent_committee_id = "N.A.";
            }
            if (value.phone == null) {
                value.phone = "N.A.";
            }
            if (value.chamber == 'house') {
                value.chamber_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/h.png';
            }
            else if (value.chamber == 'senate') {
                value.chamber_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/s.svg';
            }
            value.active = "inactive";
            committees[i] = value;
            i++;
        }
    })
    return committees;
}

function senate(data) {
    var i = 0;
    var committees = new Array();
    $.each(data, function (index, value) {
        if (value.chamber == "senate") {
            if (value.parent_committee_id == null) {
                value.parent_committee_id = "N.A.";
            }
            if (value.chamber == 'house') {
                value.chamber_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/h.png';
            }
            else if (value.chamber == 'senate') {
                value.chamber_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/s.svg';
            }
            value.active = "inactive";
            committees[i] = value;
            i++;
        }
    })
    return committees;
}

function joint(data) {
    var i = 0;
    var committees = new Array();
    $.each(data, function (index, value) {
        if (value.office == null) {
            value.office = "N.A.";
        }
        if (value.parent_committee_id == null) {
            value.parent_committee_id = "N.A.";
        }
        if (value.phone == null) {
            value.phone = "N.A.";
        }
        if (value.chamber == "joint") {
            committees[i] = value;
            i++;
        }
        value.active = "inactive";
    })
    return committees;
}



////////////////////////favorites
app.controller("favorites", function ($scope, $http) {
        $scope.fav_leg = new Array();
        $scope.fav_bill = new Array();
        $scope.fav_comm = new Array();
    $scope.$on('refresh_fav', function() { 
                //clear the data first
        $scope.fav_leg = [];
        $scope.fav_bill = [];
        $scope.fav_comm = [];
        //get data from localstorage
        if (typeof (Storage) !== "undefined") {
            for (var i = 0; i < localStorage.length; i++) {
                var obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if (obj.bioguide_id != null) {
                    $scope.fav_leg.push(obj);
                } else if (obj.bill_id != null) {
                    if (obj.chamber == 'house') {
                        obj.chamber_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/h.png';
                    }
                    else if (obj.chamber == 'senate') {
                        obj.chamber_img = 'http://cs-server.usc.edu:45678/hw/hw8/images/s.svg';
                    }
                    $scope.fav_bill.push(obj);
                } else if (obj.committee_id != null) {
                    $scope.fav_comm.push(obj);
                } else {
                    console.log("get data from storage error!");
                }
            }
        }
        else {
            console.log("storage error");
        }
    });
    
    $scope.delete_fav = function (id) {
        localStorage.removeItem(id);
        for (var i = 0; i < $scope.fav_leg.length; i++) {
            if ($scope.fav_leg[i].bioguide_id == id) {
                $scope.fav_leg.splice(i, 1);
                return;
            }
        }
        for (var i = 0; i < $scope.fav_bill.length; i++) {
            if ($scope.fav_bill[i].bill_id == id) {
                $scope.fav_bill.splice(i, 1);
                return;
            }
        }
        for (var i = 0; i < $scope.fav_comm.length; i++) {
            if ($scope.fav_comm[i].committee_id == id) {
                $scope.fav_comm.splice(i, 1);
                return;
            }
        }
    };
    
    
    $scope.showItemId = function (value) {
            id = value.bioguide_id;
            //personal information
            var url = url2 + id;
            $http.get(url).then(function (response) {
                $scope.mydata = details(value);
            });
            //committees
            var url = url4 + id;
            $http.get(url).then(function (response) {
                $scope.committes = response.data.results;
            });
            //bills
            var url = url4 + id;
            $http.get(url).then(function (response) {
                $scope.bills = response.data.results;
            });
        };
    
        $scope.showbilldetails = function (bill) {
            //personal information
            $scope.bill_details = bill_details(bill);
        };
    
});

//////////////////////////
app.controller("root", function ($scope) {
    $scope.$on('toFavorites', function(e) {
        $scope.$broadcast('refresh_fav');
    });
    $scope.$on('toCommittees', function(e) {
        $scope.$broadcast('refresh_com');
    });
    $scope.$on('toBills', function(e) {
        $scope.$broadcast('refresh_bill');
    });
    $scope.$on('toLegislators', function(e) {
        $scope.$broadcast('refresh_leg');
    });
});
               
app.controller("trigger_f", function ($scope) {
    $scope.trigger_f = function () {
        $scope.$emit('toFavorites');
    }
});

app.controller("trigger_c", function ($scope) {
    $scope.trigger_c = function () {
        $scope.$emit('toCommittees');
    }
});

app.controller("trigger_b", function ($scope) {
    $scope.trigger_b = function () {
        $scope.$emit('toBills');
    }
});

app.controller("trigger_l", function ($scope) {
    $scope.trigger_l = function () {
        $scope.$emit('toLegislators');
    }
});