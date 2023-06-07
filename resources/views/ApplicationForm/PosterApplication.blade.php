<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<script src="posterForm.js" defer></script>

<p class="lead" id="topText">     
    <span class="fs-6">For Poster Printing information and cost, please visit our <a href="https://ssts.uwo.ca/services/postergraphics/index.html" target=”_blank”>Poster Printing and Graphics page</a>.</span> <br><br>
  <strong>This printing service is for Social Science Only.</strong> Please provide the following information. Upon receiving your application, an automated message will be sent to the applicant and grant holder when applicable.
    If you wish to cancel an application or have any concerns please notify SSTS by email <a href="mailto:ssts-posters@uwo.ca" style="white-space: nowrap">ssts-posters@uwo.ca</a>.
</p>


<!-- <form class="needs-validation"  method="POST" onsubmit="return validateForm()"> -->
<!-- <form class="needs-validation" id="formTarget" action="../controller/appController.php" method="POST" onsubmit="return validateForm()" novalidate> -->
<form class="needs-validation" id="formTarget" novalidate>
<!-- #region Req Info-->    
    <div class="row">
        <div class="col-sm-12">
            <h2>Requisitioner Details</h2>
        </div>
    </div>
    <div class="row mb-4 mt-2 ms-2">
        <div class="col-sm-3 form-floating ">
            <input type="test" class="form-control" id="FirstNameInput" name="FirstName" required>
            <label for="FirstNameInput" class="form-label">First Name</label>
            <div id="validationServerUsernameFeedback" class="invalid-feedback">
                Please choose a username.
            </div>
        </div>
        <div class="col-sm-5 form-floating ">
            <input type="text" class="form-control" id="LastNameInput" name="LastName"  required>
            <label for="LastNameInput" class="form-label">Last Name</label>
        </div>
    </div>

    <div class="row mb-4 ms-2">
        <div class="col-sm-8 form-floating ">
            <input type="email" class="form-control" id="InputEmail" pattern="[a-z0-9._%+-]+[@]\buwo.ca" aria-describedby="emailHelp" value="<?php echo $_SERVER['LOGON_USER']?>@uwo.ca" name="Email" required>
            <label for="InputEmail" class="form-label">Email Address (@uwo.ca)</label>
        </div>
    </div>
    
    <div class="row mt-4">
        <div class="col-sm-12">
            <h2>Your University Status</h2>
        </div>
    </div>
    <div class="row mb-4 ms-4 g-0">
        <div class="col-sm-3 m-0 form-check-inline" id="undergradSelect" style="display: none;">
            <input class="form-check-input" type="radio" name="Position" id="UnderGradRadio" value="Undergraduate" onchange="handlePositionChange(this);" required>
            <label class="form-check-label" for="flexRadioDefault1">
                Undergaduate Student
            </label>
        </div>
        <div class="col-sm-4 m-0 form-check-inline">
            <input class="form-check-input" type="radio" name="Position" id="flexRadioDefault1" value="Faculty" onchange="handlePositionChange(this);" required>
            <label class="form-check-label" for="flexRadioDefault1">
                Faculty Member (eg. Professor)
            </label>
        </div>
        <div class="col-sm-2 m-0 form-check-inline">
            <input class="form-check-input" type="radio" name="Position" id="flexRadioDefault1" value="Staff" onchange="handleChandlePositionChange(this);" required>
            <label class="form-check-label" for="flexRadioDefault1">
                Staff
            </label>
        </div>
        <div class="col-sm-3 m-0 form-check-inline">
            <input class="form-check-input" type="radio" name="Position" id="flexRadioDefault1" value="Graduate" onchange="handlePositionChange(this);" requried>
            <label class="form-check-label" for="flexRadioDefault1">
                Graduate Student
            </label>
        </div>
        
    </div>
<!--#endregion-->


<!--#region positionOptions-->
<div id="positionOptions">
    <div class="row UnderGradOptions ms-2" style="display: none;">
        <div class="col-sm-12">
            <p>This printing service is only available to Social Science undergraduate students who are enrolled in the Pre-approved courses arranged by the course Professor. 
                We are aware that the Psychology thesis poster presentation is Friday March 24. The undergraduate Social Science student donation discount 
                (<span class="donationDiscount" id="donationDiscount"></span>) only applies when funds are available and the correct Pre-approved course number, Department, 
                and Cash payment options are selected. Posters are printed on a first come, first served basis. We will be dedicating our printing service to try and print all 
                posters for this event. Discounts DO NOT apply to speedcode payments. 
            </p>
        </div>
    </div>
    <div class="row ms-2">
        <div class="col-sm-4 UnderGradOptions" style="display: none;">
            <label for="CourseNumber" class="form-label">Pre-approved Course Number</label>
            <input type="text" class="form-control UnderGradOptions" pattern="[1-9][0-9]{3}" maxlength="4" id="CourseNumber" name="CourseNumber" aria-describedby="CourseNumberFeedback" required disabled >
        </div>
        
        <div class="col-sm-4  ms-2 department">
            <label for="DepartmentSelect" class="form-label">Department</label>
            <select class="form-select" aria-label="Default select example" name="Department" id="DepartmentSelect" required>
                <!-- <option selected></option> -->
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
        </div>
        <div class="row mb-3 ms-2 UnderGradOptions" id="UnderGradDiscountOptions" style="display: none;">
            <div id="col-sm-4 mb-3 CourseNumberFeedback">
                <p class="text-danger" id="warningFeedBackUnderGrad"></p>
            </div>
        </div>
    </div>
</div>
<!--#endregion-->
    
<!--#region Payment Options-->
    <div class="row mt-4">
        <div class="col-sm-12">
            <h2>Payment Method <span class="fs-6">(Cash or Speedcode only)</span></h2>
        </div>
    </div>
    
    <div class="row mb-2 mt-2 ms-2 input-group">
        
        <div class="col-sm-2 form-check-inline">
            <input class="form-check-input" type="radio"  id="Cash" name="PaymentType" value="Cash" onchange="handlePaymentChange(this);" required>
            <label class="form-check-label" for="flexRadioDefault1">
                Cash
            </label>
        </div>
        <div class="col-sm-2 radio-group form-check-inline" id="SpeedCodeRadio">
            <input class="form-check-input" type="radio" name="PaymentType" value="SpeedCode"  id="SpeedCode" onchange="handlePaymentChange(this);" required>
            <label class="form-check-label" for="flexRadioDefault1">
                Speedcode
            </label>
        </div>
    </div>
    <!-- <div class="row mt-2 ms-2" id="discountCheckDiv" style="display: none;">
        <div class="col-sm-12">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="discountCheck">
                <label class="form-check-label" for="flexCheckDefault">
                    Apply for discount (Pre-approved courses only)
                </label>
            </div>
            <p class="lead" id="qualifyText" style="display: none;">Discounts (when funds are available) will be applied upon completion of the poster printing.</p>
        </div>
    </div> -->

    <div class="row mb-3 ms-2 SpeedCodeOptions" id="SpeedCodeOptions" style="display: none;" disabled="true">
        <div class="row mb-2">
            <div class="col-sm-12">
                <p class="lead fs-6">Please provide the information for a speedcode to an internal UWO academic or administrative account.</p>
            </div>
        </div>
        <div class="col-sm-12">
            <!-- <div class="row mb-4">
                <div class="col-sm-4">
                    <div class="input-group">
                        <input type="text" class="form-control" name="SpeedCode" placeholder="Speedcode">
                        <input type="text" class="form-control" name="UserCode" placeholder="Usercode">
                    </div>
                    
                </div>
            </div> -->
            <div class="row mb-2">
                <div class="col-sm-6">
                    <input type="text" class="form-control grantHolderInfo SpeedCodeOptions" name="GrantHoldersName" placeholder="Grant Holder's Name" required disabled="true">
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-sm-6">
                    <!-- <label for="DepartmentSelect" class="form-label">Grant Holder's Department</label> -->
                    <select class="form-select grantHolderInfo SpeedCodeOptions" aria-label="Default select example " name="GrantHoldersDepartment" placeholder="department" id="GrantHoldersDepartmentSelect" required disabled="true">
                        <!-- <option selected></option> -->
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
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-sm-6">
                    <input type="text"  class="form-control grantHolderInfo SpeedCodeOptions" id="GrantHoldersEmail" name="GrantHoldersEmail" pattern="[a-z0-9._%+-]+[@]\buwo.ca" placeholder="Grant Holder or DOSA-approved Designate's Email" required disabled="true">
                    <p class="text-danger" id="warningFeedBackGrantHolder"></p>
                </div>
                
            </div>

            <div class="row mb-2">
                <div class="col-sm-6">
                    <input type="text" class="form-control grantHolderInfo SpeedCodeOptions" name="DesignateName" placeholder="Designate's Name (If applicable)" disabled="true">
                </div>
            </div>

            <div class="row mb-2">
                <div class="col-sm-12">
                    <p>An Automated email will be sent to the Grant Holder (or Designate) for a valid Speedcode and authorization. The email must be returned to SSTS prior to printing the poster. </p>
                </div>
            </div>
        </div>
    </div>
<!--#endregion-->

<!--#region Poster Details-->
    <div class="row mt-6">
        <div class="col-sm-12">
            <h2>Poster Details</h2>
        </div>
    </div>
    <div class="row mt-3 ms-2 mb-4">
        <div class="col-sm-8">
            <label for="formFile" class="form-label">Poster Name</label>
            <input class="form-control" type="text" id="formFile" name="PosterName"  maxlength="50" required>
            <div id="PosterName block" class="form-text">Please provide a poster name which can be used to identify the poster.
            </div>
        </div>
    </div>
    <div class="row ms-2">
        <label class="form-label">Dimensions</label>
        
        <div class="col-sm-2">
            <div class="form-floating" id="Dimensions">
                <input type="test" class="form-control" id="WidthInput" name="Width" required>
                <label for="FirstNameInput" class="form-label">Poster Width</label>
            </div>
        </div>
        
        <div class="col-sm-2">
            <div class="form-floating" id="Dimensions">
                <input type="text" class="form-control" id="HeightInput" name="Height" required>
                <label for="FirstNameInput" class="col-form-label-sm">Poster Height</label>
            </div>
        </div>
        
        <div class="col-sm-2">
            <!-- <input hidden name="Cost"> -->
            <div class="form-floating" id="Dimensions">
                <select class="form-select" id="Units" name="Units" required>
                    <option selected value="Inch">Inches</option>
                    <option  value="CM">cm</option>
                </select>
                <label for="Units" class="col-form-label-sm">Units</label>
            </div>
        </div>
        <div class="col-sm-4 p-0">
                <div class="row p-0 m-0">
                    <div cass="col-12">
                        <label for="Cost">Cost Per Poster</label>
                        <input type="hidden" name="Cost" value="" id="Cost" required>
    </div>
                </div>
                <div class="row m-0" >
                    <div class="col-sm-2 ms-0 float-start align-start" >
                        <p id="costDiv">$</p>
                    </div>
                    <div class="col-sm-10" > 
                        <p class="text-warning fs-3 UnderGradDiscountOptions" style="display: none;"><strong class="donationDiscount" >$</strong> Discount Pending</p>
                    </div>
                </div>
        </div>
            
        </div>
        
    </div>
    <div class="row">
        <div id="dimesnionText" class="col-sm-12 ms-3 form-text">Poster size is limited to 44 inches in at least one dimesion (Width or Height).</div>
    </div>

    <div class="row mt-2 ms-4 mb-4" id="discountCheckDiv" style="display: none;">
        <div class="col-sm-12">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="discountCheck">
                <label class="form-check-label" for="flexCheckDefault">
                    Apply for discount (Pre-approved courses only)
                </label>
            </div>
            <p class="lead" id="qualifyText" style="display: none;">Discounts (when funds are available) will be applied upon completion of the poster printing.</p>
        </div>
    </div>

    <div class="row mb-2">
        <div class="col-sm-2 ms-3">
            <label for="quantityInput" class="form-label" id="fieldLabel">Quantity</label>
            <div class="input-group">
                <span class="input-group-text">x</span>
                <input id="QuantityInput" class="form-control addJobField" value="1" min="1" name="Quantity" type="number" required/>
            </div>
        </div>

        
        <!-- <div class="col-sm-4" style="display: none;">
            <div class="row">
                <label for="discount">SSSC Discount</label>
                <input type="hidden" name="Discount" id="Discount" required>
            </div>
            <div class="row" >
                <div class="col-sm-4 ms-0 float-start align-start" >
                    <p id="discountDiv">$</p>
                </div>
            </div>
        </div>   -->
        <div class="col-sm-8 ms-3">
            <div class="row">
                <label for="Cost">Estimated Total</label>
                <!-- <input type="hidden" name="Total" value="" id="Cost" required> -->
                
            </div>
            
            <div class="row" >
                <!-- <div class="col-sm-4 ms-0 float-start">
                    <svg style="border:4px solid blue" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                    </svg>
                </div> -->
                <div class="col-sm-2 ms-0 float-start align-start" >
                    <p id="totalDiv" >$</p>
                </div>
                <!-- <div class="col-sm-10" > 
                    <p class="text-warning fs-3 UnderGradDiscountOptions" style="display: none;"><strong class="donationDiscount" >$</strong> Discount Pending</p>
                </div> -->
                
            </div>
        </div>
        
    </div>
    <div class="row">
        <div> 
            <p class="lead">
                Pre-payment for poster printing is NOT required. Total cost <span class="UnderGradDiscountOptions" style="display: none;">and discount (while available)</span> will be calculated when the poster has been placed in the queue for printing.
            </p>
            
        </div>
    </div>

<!--#endregion-->


<!--#region Poster File Share-->
    <div class="row mt-4">
        <div class="col-sm-12">
            <h2>Poster File</h2>
        </div>
    </div>
    <div class="row mt-2 ms-2">
        <p class="lead">
            Your <strong>PDF or PowerPoint</strong> poster file can be shared using a oneDrive link or via email. Please select an option and follow the instructions that appear.
        </p>
    </div>
    <div class="row mb-2 mt-2 ms-2 input-group">
        <div class="col-sm-2 radio-group form-check-inline">
            <input class="form-check-input" type="radio" name="posterFileType" value="oneDrive"  id="oneDriveFile" onchange="handleFileTypeChange(this);" required>
            <label class="form-check-label" for="flexRadioDefault1">
                Onedrive
            </label>
        </div>
        <div class="col-sm-2 form-check-inline">
            <input class="form-check-input" type="radio"  id="emailFile" name="posterFileType" value="email" onchange="handleFileTypeChange(this);" required>
            <label class="form-check-label" for="flexRadioDefault1">
                Email
            </label>
        </div>
    </div>
    
    <div class="row mt-3 ms-2 mb-4 oneDriveFileOptions" id="oneDriveFileOptions" style="display: none;">
        <div class="col-sm-8">
            <label for="PosterFile" class="form-label">One Drive Link to Shared Poster File</label>
            <input class="form-control oneDriveFileOptions" type="text" id="PosterFile" name="PosterFile" required>
            <div id="emailBlock" class="form-text">Please make file viewable via the shared link. The image should have the same aspect ratio as the provided poster dimensions. Instructions for sharing a file from one drive: 
                <a target="blank" href="https://support.microsoft.com/en-us/office/share-onedrive-files-and-folders-9fcc2f7d-de0c-4cec-93b0-a82024800c07#:~:text=Share%20by%20using%20%22Copy%20link%22">
                    Sharing Link</a>
                </div>
        </div>
    </div>

    <div class="row mt-3 ms-2 mb-4 emailFileOptions" id="emailFileOptions" style="display: none;" disabled="true">
        <input type="hidden emailFileInput" name="PosterFile" value="email" style="display: none;" disabled="true"/>
        <p class="lead">After submitting this form, you will be emailed a request for a poster file(s) along with further instructions. Please reply to this email with your poster file attached.</p>
    </div>
    <div class="row mt-3">
        <div class="col-sm-12">
            <p><strong>NOTE:</strong> Before submitting, please confirm that the poster dimensions match the dimensions entered on the form above. SSTS will not modify the size or make changes to your poster.</p>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <p>A confirmation email will be sent immediately upon submission of this form. If you do not receive the confirmation email, please reach out to SSTS directly.</p> 
        </div>
    </div>

<!--#endregion-->   
    <div class="row mt-2 ">
        <div class="col-sm-2">        
            <button type="submit" name="submitbtn" value="submit" class="btn btn-primary">Submit</button>
        </div>
    </div>

</form>


