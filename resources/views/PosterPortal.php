<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://getbootstrap.com/docs/5.2/assets/css/docs.css" rel="stylesheet">
    <title>View Applications</title>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
    <script src="posterPortal.js"></script>

    <link href="posterStyle.css" rel="stylesheet" />
</head>

<body class="p-3 m-0 border-0 bd-example">
    <nav class="navbar bg-light fixed-top">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <a class="navbar-brand" href="#" style="text-align: center;">
                        <img alt="Western University Social Science Logo" class="stacked-logo-two" src="https://www.uwo.ca/web_standards/img/logos-faculties-stacked/svg/Western_Logo_F_S_SocialScience_RGB.svg" style="width: 220px; margin-top: 10px;">
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <h1>Poster Portal</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Options</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="nav flex-column nav-pills mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Incoming Jobs</button>
                        </li>

                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-jobs-tab" data-bs-toggle="pill" data-bs-target="#pills-jobs" type="button" role="tab" aria-controls="pills-jobs" aria-selected="false">Jobs</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-settings-tab" data-bs-toggle="pill" data-bs-target="#pills-settings" type="button" role="tab" aria-controls="pills-settings" aria-selected="false">Settings</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-reports-tab" data-bs-toggle="pill" data-bs-target="#pills-reports" type="button" role="tab" aria-controls="pills-reports" aria-selected="false">Reports</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

    <div class="tab-content" id="pills-tabContent">

        <!-- Applications -->
        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
            <div class="container">
                <div class="row mx-auto">
                    <div class="col-sm-12 mx-auto">
                        <table class="table table-striped table-hover table-sm" id="appTable">
                            <thead>
                                <tr>
                                    <th scope="col">Application</th>
                                    <th scope="col">Firstname</th>
                                    <th scope="col">lastname</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Position</th>
                                    <!-- <th scope="col">Course Number</th> -->
                                    <th scope="col">Department</th>
                                    <th scope="col">Payment</th>
                                    <!-- <th scope="col">Speed Code</th> -->
                                    <!-- <th scope="col">User Code</th> -->
                                    <!-- <th scope="col">Grant Holder</th> -->
                                    <!-- <th scope="col">Grant Holder Email</th> -->
                                    <!-- <th scope="col">Grant Holder Department</th> -->
                                    <th scope="col">Width</th>
                                    <th scope="col">Height</th>
                                    <th scope="col">Units</th>
                                    <!-- <th scope="col">Poster Name</th> -->
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


        <!-- Jobs -->
        <div class="tab-pane fade" id="pills-jobs" role="tabpanel" aria-labelledby="pills-jobs-tab" tabindex="0">
            <div class="container">
                <div class="row mx-auto">
                    <div class="col-sm-12 mx-auto">
                        <table class="table table-striped table-hover table-sm" id="jobTable">
                            <thead>
                                <tr>
                                    <th class="text-center" scope="col">PosterNo</th>
                                    <th class="text-center" scope="col">ApplicationNo</th>
                                    <th class="text-center" scope="col">Status</th>
                                    <th class="text-center" scope="col">PaymentType</th>
                                    <th class="text-center" scope="col">Requisitioner</th>
                                    <!-- <th scope="col">Last Name</th> -->
                                    <th class="text-center"  scope="col">RequisitionerType</th>
                                    <!-- <th scope="col">Position</th> -->
                                    <th class="text-center"  scope="col">ReqEmail</th>
                                    <th class="text-center"  scope="col">Department</th>
                                    <th class="text-center"  scope="col">PrintDate</th>
                                    <th class="text-center"  scope="col">Technician</th>
                                    <!-- <th scope="col">User Code</th> -->
                                    <!-- <th scope="col">Grant Holder</th> -->
                                    <!-- <th scope="col">Grant Holder Email</th> -->
                                    <!-- <th scope="col">Grant Holder Department</th> -->
                                    <!-- <th scope="col">Width</th>
                                    <th scope="col">Height</th>
                                    <th scope="col">Units</th> -->
                                    <!-- <th scope="col">Poster Name</th> -->
                                    <!-- <th scope="col">Status</th> -->
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


        <!-- Settings -->
        <div class="tab-pane fade" id="pills-settings" role="tabpanel" aria-labelledby="pills-settings-tab" tabindex="0">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body container">
                                <h5 class="card-title">Undergrad</h5>
                                <div class="SDF mb-3 row">
                                    <h6 class="col-sm-6">Remaining SDF Balance $<strong id="remainingSDF"></strong></h6>
                                    <div class="col-sm-3 ms-auto">
                                        <button class="btn btn-primary float-end" data-bs-toggle="collapse" data-bs-target="#depositCollapse" aria-expanded="false" aria-controls="collapseExample"> Deposit </button>
                                    </div>
                                    <div class="col-sm-3">
                                        <button class="btn btn-primary float-end" data-bs-toggle="collapse" data-bs-target="#withdrawalCollapse" aria-expanded="false" aria-controls="collapseExample">Withdrawal</button>
                                    </div>
                                </div>
                                <div class="row collapse" id="depositCollapse">
                                    <label for="SDFDeposit" class="form-label mt-2"><strong>Deposit into SDF</strong></label>
                                    <div class="input-group mb-3 mt-2">
                                        <span class="input-group-text">$</span>
                                        <input type="number" class="form-control" id="SDFDeposit" aria-label="depositAmount">
                                        <button class="btn btn-outline-secondary" id="button-SDFDeposit" type="button">Deposit</button>
                                    </div>
                                </div>
                                <div class="row collapse" id="withdrawalCollapse">
                                    <label for="SDFWithdrawal" class="form-label mt-2"><strong>Withdrawal from SDF</strong></label>
                                    <div class="input-group mb-3 mt-2">
                                        <span class="input-group-text">$</span>
                                        <input type="number" class="form-control" id="SDFWithdrawal" aria-label="depositAmount">
                                        <button class="btn btn-outline-secondary" id="button-SDFWithdrawal" type="button">Withdraw</button>
                                    </div>
                                </div>
                                <div class="accordion">
                                    <div class="accordion-item" id="undergradAccordion">
                                        <p class="card-text"></p>
                                        <button class="accordion-button collapsed" id="expandUndergradCoursesBtn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            Undergraduate Courses and Discounts
                                        </button>

                                        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#underGradAccordion">
                                            <div class="accordion-body">
                                                <form class="mb-3" id="addCourseForm">
                                                    <label for="courseInput" class="form-label">Add Course</label>
                                                    <div class="input-group mb-3">
                                                        <select class="form-select" id="addCourseYear" required>
                                                            <option selected>Year</option>
                                                            <option value="2022/2023">2022/2023</option>
                                                            <option value="2023/2024">2023/2024</option>
                                                            <option value="2024/2025">2024/2025</option>
                                                            <option value="2025/2026">2025/2026</option>
                                                        </select>
                                                        <input type="text" class="form-control" placeholder="Number" id="addCourseNumber" required>
                                                        <select class="form-select" id="addCourseDepartment">
                                                            <option selected>Department</option>
                                                            <option value="" disabled selected>Department</option>
                                                            <option value="Anthropology">Anthropology</option>
                                                            <option value="Brain and Mind">Brain and Mind</option>
                                                            <option value="DAN Management">DAN Management</option>
                                                            <option value="Deans Office">Deans Office</option>
                                                            <option value="Economics">Economics</option>
                                                            <option value="Geography">Geography</option>
                                                            <option value="History">History</option>
                                                            <option value="Indigenous Studies">Indigenous Studies</option>
                                                            <option value="NEST">NEST</option>
                                                            <option value="Politcal Science">Politcal Science</option>
                                                            <option value="Psychology">Psychology</option>
                                                            <option value="Sociology">Sociology</option>
                                                            <option value="SSTS">SSTS</option>
                                                        </select>
                                                        <button class="btn btn-outline-secondary" type="button" id="addCourseBtn">Add</button>
                                                    </div>
                                                </form>
                                                <p>All Courses</p>
                                                <ul class="list-group" id="undergradCourseList">
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <label for="studentDiscount" class="form-label mt-2"><strong>Undergrad Discount </strong>(Per Poster Amount)</label>
                                <div class="input-group mb-3 mt-2">
                                    <span class="input-group-text">$</span>
                                    <input type="number" class="form-control" id="studentDiscount" aria-label="Amount (to the nearest dollar)">
                                    <button class="btn btn-outline-secondary" id="button-updateDiscount" type="button">Update</button>
                                </div>

                                <div class="form-check form-switch mt-4">
                                    <input class="form-check-input" type="checkbox" role="switch" id="undergradAppToggle">
                                    <label class="form-check-label" for="undergradAppToggle">Accept Undergrad Apps</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <form class="card">
                            <div class="card-body">
                                <h5 class="card-title">Poster Settings</h5>
                                <label for="posterCost" class="form-label">Cost</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">$</span>
                                    <input type="text" class="form-control" id="posterCost" aria-label="Amount (to the nearest dollar)">
                                    <button class="btn btn-outline-secondary" type="button" id="button-updatePrice">Update</button>
                                </div>
                                <label for="posterCost" class="form-label">Max Dimensions - Not being used.</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text me">Width</span>
                                    <input type="number" class="form-control me-2" id="posterCost" aria-label="Amount (to the nearest dollar)">
                                    <span class="input-group-text">Height</span>
                                    <input type="number" class="form-control me-2" id="posterCost" aria-label="Amount (to the nearest dollar)">
                                    <div class="me-1">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="unitsSettings" value="" id="settingsCm">
                                            <label class="form-check-label" for="defaultCheck1">
                                                cms
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="unitsSettings" value="" id="settingsInches">
                                            <label class="form-check-label" for="defaultCheck2">
                                                Inches
                                            </label>
                                        </div>
                                    </div>
                                    <button class="btn btn-outline-secondary" type="button" id="button-updateDimension">Update</button>
                                </div>
                                <div class="form-check form-switch mt-4">
                                    <input class="form-check-input" type="checkbox" role="switch" id="externalAppToggle">
                                    <label class="form-check-label" for="externalAppToggle">Accept External Apps</label>
                                    <button type="button" class="btn float-end" id="copyExternalLink">Copy link
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Reports -->
        <div class="tab-pane fade" id="pills-reports" role="tabpanel" aria-labelledby="pills-reports-tab" tabindex="0">
            <div class="row">
                <div class="col-2">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Active</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled">Disabled</a>
                        </li>
                    </ul>
                </div>
                <div class="col-8">
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                            Some placeholder content in a paragraph relating to "Home". And some more content, used here just to
                            pad out and fill this tab panel. In production, you would obviously have more real content here. And
                            not just text. It could be anything, really. Text, images, forms.
                        </div>
                        <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                            Some placeholder content in a paragraph relating to "
                        </div>
                        <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                            Some placeholder content in a paragraph relating to "Messages". And some more content, used here
                            just to pad out and fill this tab panel. In productimages, forms.
                        </div>
                        <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                            Some placeholder content in a paragraph relating to "Settings". And some more content, used here
                            just to pad out and fill this tab panel. In production, you would obviously have more real content
                            here. And not just text. It could be anything, really. Text, images, forms.
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="container">
                <div class="row bg-info g-1">
                    <div class="col-sm-2 min-vh-100 bg-secondary">
                        <div class="list-group list-group-flush bg-secondary" id="list-tab" role="tablist">
                            <a href="#" class="list-group-item list-group-item-action active m-1" data-bs-toggle="list" href="#sdfReport" role="tab" aria-current="true">SDF Report</a>
                            <a href="#" class="list-group-item list-group-item-action m-1" data-bs-toggle="list" href="#financialReport" role="tab">Course Report</a>
                            <a href="#" class="list-group-item list-group-item-action m-1" data-bs-toggle="list" href="#courseReport" role="tab">Financial Report</a>
                            <a href="#" class="list-group-item list-group-item-action m-1" data-bs-toggle="list" href="#allPosterReport" role="tab">All Posters</a>
                        </div>
                    </div>
                    <div class="col-sm-9">
                        <div class="tab-content">
                            <div class="tab-pane active" id="sdfReport" role="tabpanel">SDF Report</div>
                            <div class="tab-pane" id="financialReport" role="tabpanel">Financial Report</div>
                            <div class="tab-pane" id="courseReport" role="tabpanel">Course Report</div>
                            <div class="tab-pane" id="allPosterReport" role="tabpanel">All Posters</div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>


    </div>

    <div class="modal" id="EditAppModal" tabindex="-1">
        <div class="modal-dialog">
            <form class="modal-content needs-validation" id="editAppForm" novalidate>
                <div class="modal-header" id="EditAppModalHeader">
                    <h5 class="modal-title" id="EditAppModalTitle"></h5>
                    <button type="button" class="btn-close closeModal" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body container collapse show" id="modalContainer">
                    <!-- Do not need app ID..This should never change and is already at top (title of modal)\-->
                    <input type="hidden" name="ApplicationId" id="ApplicationId" required>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Please use text
                    </div>

                    <!-- Name/Email -->
                    <div class="input-group mb-3">
                        <!-- <span class="input-group-text" id="fieldLabel">Name</span> -->

                        <input type="text" class="form-control" placeholder="FirstName" id="FirstName" name="FirstName" aria-label="FirstName" required>

                        <input type="text" class="form-control" placeholder="LastName" id="LastName" name="LastName" aria-label="LastName" required>
                        <div class="col-sm-5">
                            <input type="text" class="form-control" placeholder="Email" id="Email" name="Email" aria-label="Email" required>
                        </div>
                    </div>

                    <!-- Req Info -->
                    <div class="row g-1">
                        <div class="col-sm-4">
                            <select class="form-select mb-3" id="Position" name="Position" aria-label="Default select example" required>
                                <option value="Faculty">Faculty</option>
                                <option value="Staff">Staff</option>
                                <option value="Graduate">Graduate</option>
                                <option value="Undergraduate">Undergraduate</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <select class="form-select mb-3" id="Department" name="Department" aria-label="Default select example" required>
                                <option value="Anthropology">Anthropology</option>
                                <option value="Brain and Mind">Brain and Mind</option>
                                <option value="DAN Management">DAN Management</option>
                                <option value="Deans Office">Deans Office</option>
                                <option value="Economics">Economics</option>
                                <option value="Geography">Geography</option>
                                <option value="History">History</option>
                                <option value="Indigenous Studies">Indigenous Studies</option>
                                <option value="NEST">NEST</option>
                                <option value="Politcal Science">Politcal Science</option>
                                <option value="Psychology">Psychology</option>
                                <option value="Sociology">Sociology</option>
                                <option value="SSTS">SSTS</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="col-sm-4 collapse-horizontal collapse" id="otherDepartmentDiv">
                            <input type="text" class="form-control" placeholder="Other Dep." id="otherDepartment" name="otherDepartment" aria-label="Email">
                        </div>

                    </div>

                    <!-- Undergrad Info -->
                    <div class="row undergradData">
                        <div class="col mb-3">
                            <label for="CourseNumber" class="form-label undergradData" disabled>Course Number</label>
                            <input type="text" class="form-control undergradData" placeholder="CourseNum" id="CourseNumber" name="CourseNumber" disabled required>
                        </div>
                        <!-- <div class="col mb-3">
                            <label for="CourseDepartment" class="form-label undergradData" disabled>Course Department</label>
                            <input type="text" class="form-control undergradData" placeholder="CourseNum" id="CourseDepartment" name="CourseDepartment" disabled required>
                        </div> -->
                    </div>

                    <!-- SpeedCode Info -->
                    <div class="row">
                        <div class="col-3">
                            <select class="form-select mb-3" id="PaymentType" name="PaymentType" aria-label="Default select example" required>
                                <option value="SpeedCode">SpeedCode</option>
                                <option value="Cash">Cash</option>
                            </select>
                        </div>
                        <div class="col speedCodeData">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="fieldLabel">Code</span>
                                <input type="text" class="form-control speedCodeData" maxlength="4" minlength="4" placeholder="SpeedCode" name="SpeedCode" id="SpeedCode" aria-label="Speed Code" required>
                                <input type="text" class="form-control speedCodeData" maxlength="6" minlength="6" placeholder="UserCode" name="UserCode" id="UserCode" aria-label="User Code">
                            </div>
                        </div>
                    </div>

                    <!-- Grantholder Info -->

                    <div class="row mb-3">
                        <label for="input-group" class="form-label"><strong>Grant Holder Info</strong></label>
                        <div class="col-sm-4">
                            <label for="GrantHoldersName" class="form-label">Grant Holder</label>
                            <input type="text" class="form-control speedCodeData" placeholder="GrantHolder" name="GrantHoldersName" id="GrantHoldersName" disabled required>
                        </div>
                        <div class="col-sm-4">
                            <label for="GrantHoldersEmail" class="form-label">Email</label>
                            <input type="text" class="form-control speedCodeData" placeholder="GH Email" name="GrantHoldersEmail" id="GrantHoldersEmail" disabled required>
                        </div>
                        <div class="col-sm-4">
                            <label for="DesignateName" class="form-label">Designate Name</label>
                            <input type="text" class="form-control speedCodeData" placeholder="Designate Name" name="DesignateName" id="DesignateName" disabled>
                        </div>
                    </div>
                    <div class="row mb-1">
                        <div class="col-sm-5">
                            <select class="form-select speedCodeData" id="GrantHoldersDepartment" name="GrantHoldersDepartment" disabled required>
                                <option value="Anthropology">Anthropology</option>
                                <option value="Brain and Mind">Brain and Mind</option>
                                <option value="DAN Management">DAN Management</option>
                                <option value="Deans Office">Deans Office</option>
                                <option value="Economics">Economics</option>
                                <option value="Geography">Geography</option>
                                <option value="History">History</option>
                                <option value="Indigenous Studies">Indigenous Studies</option>
                                <option value="NEST">NEST</option>
                                <option value="Politcal Science">Politcal Science</option>
                                <option value="Psychology">Psychology</option>
                                <option value="Sociology">Sociology</option>
                                <option value="SSTS">SSTS</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="col-sm-4 collapse-horizontal collapse" id="otherGrantHoldersDepartmentDiv">
                            <input type="text" class="form-control" placeholder="Other Dep." id="otherGrantHoldersDepartment" name="otherGrantHoldersDepartment" aria-label="Email">
                        </div>
                        <div class="col-sm-5">

                        </div>
                    </div>
                    <!-- <div class="row mt-3">
                        <div class="col-sm-6">
                            <input type="text" class="form-control speedCodeData" placeholder="Grant Holders Name" name="GrantHoldersName" id="GrantHoldersName" disabled required>
                        </div>
                        <div class="col-sm-6">
                            <input type="text" class="form-control speedCodeData" placeholder="Building & room" name="GrantHoldersRoom" id="GrantHoldersRoom" disabled required>
                        </div>
                    </div> -->

                    <!-- Poster Dimensions -->
                    <div class="row">
                        <label for="Width" class="form-label"><strong>Dimensions (W x H)</strong></label>

                        <div class="input-group mb-3 col-sm-12">
                            <input type="text" class="form-control" placeholder="Width" id="Width" name="Width" aria-label="Width" disabled required>
                            <input type="text" class="form-control" placeholder="height" id="Height" name="Height" aria-label="Height" disabled required>
                            <select class="form-select" id="Units" name="Units" aria-label="Default select example">
                                <option selected value="CM">cm</option>
                                <option value="Inch">Inches</option>
                            </select>
                        </div>
                    </div>

                    <!-- PosterName -->
                    <div class="row mb-2">
                        <label for="Width" class="form-label"><strong>File Name</strong></label>

                        <div class="input-group mb-3 col-sm-12">
                            <input type="text" class="form-control" placeholder="noName" name="PosterName" id="PosterName" aria-label="FirstName" disabled='disabled'>
                        </div>
                    </div>

                    <!-- Poster File Type -->
                    <div class="row mb-2">
                        <label for="Width" class="form-label"><strong>Poster File</strong></label>
                        <div class="input-group mb-3">
                            <button class="input-group-text btn" type="button" id="openFileBtn" style="display: none;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                                    <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                                </svg>
                            </button>
                            <input type="text" class="form-control" placeholder="noName" name="PosterFile" id="PosterFile" aria-label="PosterFile" readonly required>
                            <button class="input-group-text btn btn-outline-secondary" type="button" id="editFileBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" id="editButtonSvg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" id="saveButtonSvg" width="16" height="16" fill="currentColor" class="bi bi-check2 d-none" viewBox="0 0 16 16">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                </svg>
                            </button>

                            <button class="input-group-text btn btn-warning" type="button" id="sendProblemEmail">
                                Email Notice
                            </button>
                        </div>
                    </div>
                    <div class="row d-none" id="emailNotice">
                        <div class="mb-3">
                            <label for="emailNoticeTo" class="form-label">To:</label>
                            <input type="email" class="form-control" id="emailNoticeTo" placeholder="name@example.com">
                        </div>
                    </div>

                    <!-- Expand to add Job -->
                    <div id="addJobSection">
                        <div class="row" id="approveBtn">
                            <div class="col-xs-12">
                                <button type="Button" class="btn btn-dark" id="ApprovePoster" type="button" data-bs-toggle="collapse" data-bs-target="#acceptJob">Accept Job</button>
                            </div>
                        </div>
                        <div class="collapse" id="addJob">
                            <div class="row mt-3">
                                <div class="col">
                                    Add new Job from application:
                                </div>
                                <div class="col">
                                    <button class="btn float-end" id="closeAddJobBtn"><span style="font-weight:bolder;">X</span></button>
                                </div>
                            </div>
                            <div class="row mb-3 mt-2">
                                <div class="col-sm-5">
                                    <label for="Technician" class="form-label" id="fieldLabel">Technician</label>
                                    <select class="form-select mb-3 addJobField" id="Technician" name="Technician" aria-label="Default select example" required disabled>
                                        <option value="Rick">Rick Cornwall</option>
                                        <option value="Steve">Steve Bamford</option>
                                        <option value="Kirk">Kirk Vander Ploeg</option>
                                    </select>
                                    <!-- <input class="form-control addJobField" id="Technician" name="Technician" placeholder="sstsStaff" type="text" required disabled /> -->
                                </div>
                                <!-- <div class="col-sm-4">
                                    <label for="dateSelection" class="form-label" id="fieldLabel">Print Date</label>
                                    <input id="dateSelection" class="form-control addJobField" name="PrintDate" type="date" required disabled />
                                </div> -->
                            </div>
                            <div class="row mb-3 no-gutter">
                                <div class="col-sm-5">
                                    <label for="costInput" class="form-label" id="fieldLabel">Cost</label>
                                    <div class="input-group costGroup">
                                        <span class="input-group-text">$</span>
                                        <input id="Cost" class="form-control addJobField" name="Cost" type="number" step="any" pattern="^\d+(?:\.\d{1,2})?$" disabled required />
                                        <button class="btn btn-outline-secondary" type="button" id="resetCostBtn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                            </svg>
                                        </button>
                                        <!-- <span class="input-group-text">.00</span> -->
                                    </div>
                                </div>
                                <div class="col-sm-5">
                                    <label for="quantityInput" class="form-label" id="fieldLabel">Quantity</label>
                                    <div class="input-group">
                                        <span class="input-group-text">x</span>
                                        <input id="Quantity" class="form-control addJobField" value="1" min="1" name="Quantity" type="number" required disabled />
                                    </div>
                                </div>
                                <!-- <div class="col-sm-4 pe-0 justify-content-sm-end position-relative"> -->
                                <!-- <label for="costInput" class="form-label" id="fieldLabel">t</label> -->
                                <!-- <div class="position-absolute bottom-0"> -->
                                <!-- <button class="btn btn-dark position-absolute bottom-0" type="button" style="--bs-btn-font-size: .75rem;" id="calculateCostBtn">Calculate</button>
                                    <button class="btn btn-outline-dark position-absolute bottom-0 end-0" type="button" style="--bs-btn-font-size: .75rem;" id="resetCostBtn">Reset</button>
                                    
                                </div> -->
                                <!-- <div class="col-sm-2" style="border: solid black 4px">
                                    <button type="button" class="btn btn-primary align-bottom" style="--bs-btn-font-size: .75rem;">
                                        reset
                                    </button>
                                </div> -->

                            </div>
                            <div class="row mb-3 no-gutter ">
                                <div class="col-sm-4">
                                    <div class="form-check form-switch form-switch">
                                        <label class="form-label" for="applyDiscountSwitch">Apply Discount</label>
                                        <input class="form-check-input" type="checkbox" id="applyDiscountSwitch">
                                    </div>
                                </div>

                                <div class="col-sm-4">
                                    <select hidden class="form-select form-select discountField" name="CourseNo" id="Course" aria-label=".form-select example" required disabled>
                                    </select>

                                </div>

                            </div>
                            <div class="row mb-3 position-relative">
                                <div class="col-sm-4 discountField" hidden>
                                    <label for="discountInput" class="form-label" id="fieldLabel">Discount</label>
                                    <div class="input-group " data-bs-toggle="tooltip">
                                        <span class="input-group-text">$</span>
                                        <input id="discountInput" class="form-control discountField" name="Discount" type="number" required disabled readonly />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <label for="totalInput" class="form-label" id="fieldLabel">Total</label>
                                    <div class="input-group">
                                        <span class="input-group-text">$</span>
                                        <input id="totalInput" class="form-control addJobField bg-light" name="Total" type="number" min="0.01" step="0.01" required disabled />
                                    </div>
                                </div>
                                <div class="col-sm-4 pe-0 justify-content-sm-end position-relative no-gutter">
                                    <!-- <label for="costInput" class="form-label" id="fieldLabel">t</label> -->
                                    <!-- <div class="position-absolute bottom-0"> -->
                                    <button class="btn btn-dark position-absolute ms-0 me-0 bottom-0" type="button" style="--bs-btn-font-size: .75rem;" id="calculateCostBtn">Calculate</button>
                                    <button class="btn btn-outline-dark position-absolute ms-0 me-0 bottom-0 end-0" type="button" style="--bs-btn-font-size: .75rem;" id="resetTotalBtn">Reset</button>

                                </div>
                            </div>
                            <!-- <div class="row mb-3 ms-1 me-1">
                                    <label for="commentInput" class="form-label">Description</label>
                                    <input type="text" class="form-control addJobField" name="Description" id="description" disabled required></textarea>
                                </div> -->
                            <div class="row mb-3 ms-1 me-1">
                                <label for="commentInput" class="form-label">Comments</label>
                                <textarea class="form-control addJobField" id="commentInput" name="Comments" rows="3" disabled></textarea>
                            </div>
                            <!-- <div class="row">
                                <div class="col">
                                    <p>Approving will add poster to Access and become searchable there.</p>
                                    <button type="submit" class="btn btn-dark float-start" id="approvePosterBtn">Approve</button>
                                </div>
                            </div> -->

                            <!-- Below is a switch for approving the poster. It is not being used right now but may be useful in the future. As It
                            stands, a poster is approvedwhen it is accepted as a job. -->
                            <!-- <div class="row">
                                <div class="col-sm-12 o-switch btn-group" data-toggle="buttons" role="group">
                                    <input type="radio" class="btn-check" id="RejectedSwitch" name="Approved" value="Rejected" autocomplete="off" checked>
                                    <label class="btn btn-outline-danger" for="RejectedSwitch">Rejected</label>
                                
                                    <input type="radio" class="btn-check" id="PendingSwitch" name="Approved" value="Pending" autocomplete="off"> 
                                    <label class="btn btn-outline-primary" for="PendingSwitch" id="PendingSwitchLabel">Pending</label>
                                    
                                    <input type="radio" class="btn-check" id="ApprovedSwitch" name="Approved" value="Approved" autocomplete="off">
                                    <label class="btn btn-outline-success" for="ApprovedSwitch">Approved</label>
                                </div>
                            </div> -->

                            <div class="row">
                                <div class="col">
                                    <p>Approving will add poster to Access and become searchable there. Please do not approve until all payment information hase been collected and authenticated.</p>
                                    <button type="submit" class="btn btn-dark float-start" id="createJobBtn">Create Job</button>
                                </div>
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <div class="collapse" id="acceptJobWarning">
                                    <div class="card card-body alert alert-warning">
                                        Accepting a Job will email the applicant notifiying that the poster has been accepted and will be made shortly.
                                        The poster will be accessible through Access for further processing. Please do not approve until all payment information hase been collected and authenticated.
                                        <div>
                                            <button type="button" class="btn btn-secondary me-3 float-end" id="continueBtn">Continue</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" id="EditAppModalFooter">
                    <!-- <button type="button" class="btn btn-danger ms-0"  data-bs-dismiss="modal" id="deleteAppButton">Delete</button> -->
                    <button type="button" class="btn btn-danger me-auto" data-bs-toggle="collapse" data-bs-target="#confirmDeleteAppCollapse" aria-expanded="false" aria-controls="confirmDeleteAppCollapse" id="deleteAppBtn">Delete</button>
                    <div class="alert alert-danger collapse w-100" id="confirmDeleteAppCollapse" role="alert">
                        <p class="w-100"> Are you sure you want to delete this application?</p>
                        <div class="ms-auto d-flex">
                            <!-- <button type="button" id="ConfirmDeleteYesBtn" class="btn btn-danger ms-0" data-bs-dismiss="modal">Yes</button> -->
                            <button type="button" id="ConfirmDeleteYesBtn" class="btn btn-danger ms-0" data-bs-toggle="collapse" data-bs-target="#confirmDeleteAppCollapse">Yes</button>
                            <button type="button" id="ConfirmDeleteBackBtn" class="btn btn-secondary ms-auto" data-bs-toggle="collapse" data-bs-target="#confirmDeleteAppCollapse">Back</button>
                        </div>

                    </div>
                    <p class="ms-auto text-danger" id="footerNotice"></p>
                    <button type="button" class="btn btn-secondary ms-auto" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="modalSubmitBtn">Save Changes</button>
                </div>
            </form>
        </div>
    </div>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation" viewBox="0 0 16 16">
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
                </svg>
                <strong class="me-auto" id="liveToastHead"></strong>
                <small id="liveToastSmall"></small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body" id="liveToastBody">

            </div>
        </div>
    </div>

    <div class="modal" id="editPosterModal" tabindex="-1">
        <div class="modal-dialog" id="posterJobModal">
            <form class="modal-content needs-validation" id="editPosterForm" novalidate>
                <div class="modal-header" id="editPosterModalHeader">
                    <h5 class="modal-title" id="editPosterModalTitle"></h5>
                    <p class="lead" id="headerPosterName"></p>
                    <button type="button" class="btn-close closeModal" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body container collapse show" id="modalContainer">
                    <dl class="row">
                        <dt class="col-sm-3">Name</dt>
                        <dd class="col-sm-9" id="reqName"></dd>

                        <dt class="col-sm-3">Type</dt>
                        <dd class="col-sm-9" id="reqType"></dd>

                        <dt class="col-sm-3">Email</dt>
                        <dd class="col-sm-9" id="reqEmail"></dd>

                        <dt class="col-sm-3">Picked up</dt>
                        <dd class="col-sm-9" id="pickUp"></dd>
                    </dl>
                    <!-- </div> -->
                    <!-- <div class="row mt-2 needsPickUp" id="pickUpBtnDiv" style="display: none;"> -->

                    <!-- Completed -->
                    <div class="row mt-2 completedPoster" id="pickUpBtnDiv" style="display: none;">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col">
                                    <button type="button" class="btn btn-primary completedPoster" id="printRecieptBtn" style="display: none;">Show Receipt</button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Printed and pending pickup-->
                    <div class="row mt-2 needsPickUp" id="pickUpBtnDiv" style="display: none;">
                        <div class="col-sm-6">
                            <button type="button" class="btn btn-primary needsPickUp" id="printRecieptBtn" style="display: none;">Show Receipt</button>
                        </div>
                        <div class="col-sm-6 needsPickUp align-self-end" style="display: none; border: 2px, solid, black;">
                            <button type="button" class="btn btn-primary needsPickUp float-end" id="confirmPickupBtn" style="display: none;">Confirm Pick Up</button>
                        </div>
                    </div>


                    <!-- Print Reciept Options. There are two types of reciepts (cash and Speedcode) Some fields should only be visible for cash and vice versa
                        so use classes to hide/show the necessary ones -->
                    <div class="row mt-3 recieptOptions bg-light bg-gradient pb-3" style="display: none;">
                        <div class="row mt-3 recieptOptions" style="display: none;">
                            <div class="col">
                                <h5>Receipt Info</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-2 recieptOptions" style="display: none;">
                                <label for="receiptDate" class="form-label recieptOptions">Date</label>
                                <input type="date" class="form-control recieptOptions" name="" id="receiptDate" aria-describedby="emailHelp" />
                            </div>
                            <div class="col-2 recieptOptions" style="display: none;">
                                <label for="receiptTechnician" class="form-label">Technician</label>
                                <input type="text" class="form-control" name="receiptTechnician" id="receiptTechnician" />
                            </div>
                            <div class="col-2 recieptOptions" style="display: none;">
                                <label for="receiptRequisitionerType" class="form-label">Req. Type</label>
                                <input type="text" class="form-control" name="receiptRequisitionerType" id="receiptRequisitionerType" />
                            </div>
                            <div class="col-2 recieptOptions" style="display: none;">
                                <label for="receiptDepartment" class="form-label">Department</label>
                                <input type="text" class="form-control" name="receiptDepartment" id="receiptDepartment" />
                            </div>
                            <div class="col-2 recieptOptions" style="display: none;">
                                <label for="receiptCourseNo" class="form-label">Course No.</label>
                                <input type="text" class="form-control" name="receiptCourseNo" id="receiptCourseNo" />
                            </div>
                            <div class="col-2 recieptOptions" style="display: none;">
                                <label for="receiptPosterNo" class="form-label">Poster No.</label>
                                <input type="text" class="form-control" name="receiptPosterNo" id="receiptPosterNo" />
                            </div>
                        </div>
                        <div class="row mt-3 justify-content-end">
                            <div class="col-3 recieptOptions" style="display: none;">
                                <label for="receiptApplicationNo" class="form-label">Application No.</label>
                                <input type="text" class="form-control" name="receiptApplicationNo" id="receiptApplicationNo" />
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-12">
                                <div class="row recieptOptions" style="display: none;">
                                    <h5>Requisitioner</h5>
                                </div>
                                <div class="row">
                                    <div class="col-5 recieptOptions" style="display: none;">
                                        <label for="receiptRequisitioner" class="form-label">Name</label>
                                        <input type="text" class="form-control" name="receiptRequisitioner" id="receiptRequisitioner" />
                                    </div>
                                    <div class="col-5 recieptOptions" style="display: none;">
                                        <label for="receiptReqEmail" class="form-label">Email</label>
                                        <input type="text" class="form-control" name="receiptReqEmail" id="receiptReqEmail" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-12">
                                <div class="row recieptOptions" style="display: none;">
                                    <h5>Payment</h5>
                                </div>
                                <div class="row">
                                    <div class="col-4 recieptOptions" style="display: none;">
                                        <select class="form-select" id="receiptPaymentType" name="receiptPaymentType" required>
                                            <option value="Cash">Cash</option>
                                            <option value="SpeedCode">SpeedCode</option>
                                            <!-- <input class="form-check-input" type="radio" name="receiptPaymentType" id="receiptPaymentType" value="Cash">
                                            <label class="form-check-label" for="receiptPaymentType">Cash</label> -->
                                        </select>
                                        <!-- <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="receiptPaymentType" id="receiptPaymentType" value="SpeedCode">
                                            <label class="form-check-label" for="receiptPaymentType">Speed Code</label>
                                        </div> -->
                                        <!-- <label for="receiptPaymentType" class="form-label">Type</label>
                                        <input type="text" class="form-control" name="receiptPaymentType" id="receiptPaymentType"/> -->
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-5 CashRecieptOptions" style="display: none;">
                                        <label for="receiptReceivedFrom" class="form-label">Received From</label>
                                        <input type="text" class="form-control" name="receiptReceivedFrom" id="receiptReceivedFrom" />
                                    </div>
                                    <div class="col-2 CashRecieptOptions" style="display: none;">
                                        <label for="receiptReceivedSum" class="form-label">Amount</label>
                                        <input type="number" step='0.01' class="form-control" name="receiptReceivedSum" id="receiptReceivedSum" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Grant info -->
                        <div class="row mt-3 SpeedCodeReceiptOptions" style="display: none;">
                            <h6>Grant Information</h6>
                        </div>
                        <div class="row  SpeedCodeReceiptOptions" style="display: none;">
                            <div class="col-6 SpeedCodeReceiptOptions" style="display: none;">
                                <label for="receiptGrantHoldersName" class="form-label">Grant Holder's Name</label>
                                <input type="text" class="form-control" name="receiptGrantHoldersName" id="receiptGrantHoldersName" />
                            </div>
                            <div class="col-6 SpeedCodeReceiptOptions" style="display: none;">
                                <label for="receiptGrantHoldersEmail" class="form-label">Grant Holder/Designate Email</label>
                                <input type="text" class="form-control" name="receiptGrantHoldersEmail" id="receiptGrantHoldersEmail" />
                            </div>
                        </div>
                        <div class="row SpeedCodeReceiptOptions" style="display: none;">
                            <div class="col-6 SpeedCodeReceiptOptions" style="display: none;">
                                <label for="receiptDesignateName" class="form-label">Designate's Name</label>
                                <input type="text" class="form-control" name="receiptDesignateName" id="receiptDesignateName" />
                            </div>
                        </div>
                        <div class="row SpeedCodeReceiptOptions" style="display: none;">
                            <div class="col-6 SpeedCodeReceiptOptions" style="display: none;">
                                <label for="receiptGrantSpeedCode" class="form-label">Speed Code and Account</label>
                                <input type="text" class="form-control" name="receiptGrantSpeedCode" id="receiptGrantSpeedCode" />
                            </div>
                        </div>
                        <!-- Payment Details -->
                        <div class="row mt-3">
                            <div class="col-12">
                                <div class="row recieptOptions" style="display: none;">
                                    <h5>Details</h5>
                                </div>
                                <div class="row">
                                    <div class="col-2 recieptOptions" style="display: none;">
                                        <label for="receiptTotalQuantity" class="form-label">Quantity</label>
                                        <input type="text" class="form-control" name="receiptTotalQuantity" id="receiptTotalQuantity" />
                                    </div>
                                    <div class="col-8 recieptOptions" style="display: none;">
                                        <label for="receiptDescription1" class="form-label">Description</label>
                                        <input type="text" class="form-control" name="receiptDescription1" id="receiptDescription1" />
                                    </div>
                                    <div class="col-2 recieptOptions" style="display: none;">
                                        <label for="receiptCost1" class="form-label">Cost</label>
                                        <input type="text" class="form-control" name="receiptCost1" id="receiptCost1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- SDF discount -->
                        <div class="row mt-2 justify-content-end">
                            <div class="col-2 CashRecieptOptions" style="display: none;">
                                <label for="receiptCost" class="form-label">SDF Discount</label>
                            </div>
                            <div class="col-2 CashRecieptOptions" style="display: none;">
                                <input type="text" class="form-control" name="receiptDiscount" id="receiptDiscount" />
                            </div>
                        </div>
                        <!-- Total -->
                        <div class="row mt-2 justify-content-end">
                            <div class="col-2 recieptOptions" style="display: none;">
                                <label for="receiptCost" class="form-label">Total</label>
                            </div>
                            <div class="col-2 recieptOptions" style="display: none;">
                                <input type="text" class="form-control" name="receiptTotal" id="receiptTotal" />
                            </div>
                        </div>
                        <div class="d-flex flex-row recieptOptions" style="display: none;">
                            <div class="d-flex justify-content-start recieptOptions mt-4" style="display: none;">
                                <button type="button" id="emailPDFToReqBtn" class="btn btn-primary ml-0">Email to Requisitioner</button>
                            </div>
                            <div class="d-flex justify-content-end recieptOptions mt-4 ms-1" style="display: none;">
                                <button type="button" id="emailPDFToGHBtn" class="btn btn-primary ml-0">Email to GrantHolder</button>
                            </div>
                            <div class="d-flex justify-content-end recieptOptions mt-4 ms-1" style="display: none;">
                                <button type="button" id="emailPDFToAABtn" class="btn btn-primary ml-0">Email to Mary</button>
                            </div>
                            <div class="d-flex recieptOptions mt-4 ms-auto" style="display: none;">
                                <button type="button" id="savePDFBtn" class="btn btn-primary ml-0">Save as PDF</button>
                            </div>
                        </div>
                    </div>

                    <!-- Printed, pickup notice not yet sent -->
                    <div class="row mt-2 printedPoster" id="pickUpBtnDiv" style="display: none;">
                        <div class="col-sm-6 printedPoster" style="display: none;">
                            <button type="button" class="btn btn-primary printedPoster" id="pickUpBtn" style="display: none;">Send Pickup Notice</button>
                        </div>
                    </div>

                    <!-- not printed  yet -->
                    <div class="row mt-2 prePrintPoster" id="notPrinted" style="display: none;">
                        <div class="col-sm-3 prePrintPoster" style="display: none;">
                            <button type="button" class="btn btn-primary prePrintPoster" id="printedPosterBtn" style="display: none;">Poster Printed</button>
                        </div>
                        <div class="col-sm-6 prePrintPoster">
                            <p>Print date will be set as today
                            <p>
                        </div>
                    </div>


                </div>
                <div class="modal-footer" id="EditAppModalFooter">
                    <!-- <button type="button" class="btn btn-danger ms-0"  data-bs-dismiss="modal" id="deleteAppButton">Delete</button> -->
                    <!-- <p class="ms-auto text-danger" id="footerNotice" ></p> -->
                    <button type="button" class="btn btn-secondary ms-auto" data-bs-dismiss="modal">Close</button>
                    <!-- <button type="button" class="btn btn-primary" id="modalSubmitBtn">Update</button> -->
                </div>
            </form>
        </div>
    </div>

    <div class="modal" id="emailModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div class="modal-content" style="background-color: #abdbe3;">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <input type="email" placeholder="email" class="form-control" id="emailAddressNotice">
                            </div>
                            <div class="col-sm-6 mb-3">
                                <select class="form-select" id="presetEmailSelect" aria-label="Default select example">
                                    <option selected>Preset Email</option>
                                    <option value="corruptFile">Corrupt / File Format Issue</option>
                                    <option value="formatIssue">Formatting Issue</option>
                                    <option value="tooLarge">Poster size too large</option>
                                    <option value="sizeMismatch">Size Mistmatch</option>
                                    <option value="nonSSC">Non SSC</option>
                                    <option value="wrongFileType">Incorrect File Type</option>


                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <textarea class="form-control" id="emailTextArea" rows="8">
                                    This email has been sent to notify you of an issue preventing the printing of your requested poster. 
                                </textarea>
                            </div>
                        </div>
                        <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" id="sendEmailBtn" class="btn btn-primary">Send Email</button>
                </div>
            </div>
        </div>
    </div>




</body>

</html>