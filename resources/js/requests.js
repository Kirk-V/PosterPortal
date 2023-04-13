const departments = ["Anthropology","Brain","DAN","Deans","Economics","Geography","History","Indigenous","NEST","Politcal","Psychology","Sociology","SSTS"];
$(document).ready(function() {
    
    //  These are the fields that will be used to insert data into the table of apps. Add/Remove column names from the DB to add/remove
    // the fields of data in the UI table
    // const tableFields = ["ApplicationId","FirstName", "LastName","Email","Position","Department","PaymentType","Width","Height","Units","PosterName","Approved"];
    const tableFields = ["ApplicationId","FirstName", "LastName","Email","Position","Department","PaymentType","Width","Height","Units","Approved"];
    console.log("gettings apps\n");
    showApps(tableFields);

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    //  Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                console.log("Invalid Form");
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false)
    });

    $(document).on('hide.bs.modal', "#EditAppModal", function(){
        console.log("hiding edit app mnodal");
        $("#editAppForm").trigger("reset");
        $("#editAppForm").removeClass('was-validated');
        resetAppModal();
    })


    $(document).on('change', '#Department', function(){
        //Must show the other department Text Box
        if($("#Department").val() == "Other")
        {
            $("#otherDepartmentDiv").collapse('show');
        }
        else
        {
            $("#otherDepartmentDiv").collapse('hide');
        }
    });

    $(document).on('change', '#GrantHoldersDepartment', function(){
        //Must show the other department Text Box
        if($("#GrantHoldersDepartment").val() == "Other")
        {
            $("#otherGrantHoldersDepartmentDiv").collapse('show');
        }
        else
        {
            $("#otherGrantHoldersDepartmentDiv").collapse('hide');
        }
    });

    
    //settings for portal from db
    var config = {
        settings: {},
        courses: {}
    };

    getSettings('all', config); //update config with settings
    getCourses(config); //update config with course info

    //#region Navigation
    $(document).on('show.bs.tab', "#pills-settings-tab", async function(){
        console.log("Getting Settings Info\n");
        getSettings('all', config);
        getCourses(config);
        $("#posterCost").val(config['settings']['cost']);
        if(config['settings']['undergrad'] == 'true')
        {
            $("#undergradAppToggle").prop( "checked", true );
            console.log("undergrad on");
        }
        else{
            $("#undergradAppToggle").prop( "checked", false);
            console.log("undergrad not on");
        }
        if(config['settings']['external'] == 'true')
        {
            $("#externalAppToggle").prop( "checked", true );
            console.log("undergrad on");
        }
        else{
            $("#externalAppToggle").prop( "checked", false);
            console.log("undergrad not on");
        }
        $("#remainingSDF").text(await getSDFBalance());
        $("#studentDiscount").val(config['settings']['ssscDiscount']);
        
    })

    $(document).on('show.bs.tab', "#pills-jobs-tab", function(){
        console.log("fired");
        getJobs(150, 0);
    })
    //#endregion


    //#region View Apps Page
    $(document).on('click','.applicationTableRow',async function(){
        await expandApp(this.id);
        var dt = new Date()
        
        var dateM = dt.toLocaleDateString('default', {month: 'long'});  
        var dateY = dt.toLocaleDateString('default', {year: 'numeric'});
        var dateD = dt.toLocaleDateString('default', {day: 'numeric'});
        var dateStamp = `${dateY}-${dateM}-${dateD}`;
        var name = $("#FirstName").val();
        console.log("name:"+name);
        
        console.log(`date is ${$("#FirstName").val()}_${dateStamp}`);
        $("#fileName").val(`${$("#FirstName").val()}_${dateStamp}`); 
    })

    $(document).on('click','.applicationTableRow',async function(){
        await expandApp(this.id);
        var dt = new Date()
        
        var dateM = dt.toLocaleDateString('default', {month: 'long'});  
        var dateY = dt.toLocaleDateString('default', {year: 'numeric'});
        var dateD = dt.toLocaleDateString('default', {day: 'numeric'});
        var dateStamp = `${dateY}-${dateM}-${dateD}`;
        var name = $("#FirstName").val();
        console.log("name:"+name);
        
        console.log(`date is ${$("#FirstName").val()}_${dateStamp}`);
        $("#fileName").val(`${$("#FirstName").val()}_${dateStamp}`); 
    })

    $(document).on('hidden.bs.modal', "#EditAppModal", function(event){ 
        showApps(tableFields);
    })

    $(document).on('hidden.bs.modal', "#editPosterModal", function(event){
        //collapse receipt area
        console.log("hiding receipt");
        $(".recieptOptions").hide();
    });

    $(document).on('hide.bs.modal', "#editPosterModal", function(event){
        //collapse receipt area
        console.log("hiding receipt");
        $(".recieptOptions").hide();
    });

    // Accepting job and adding to db.
    $(document).on('click', "#createJobBtn", function(event){
        console.log("Approving work");
        const form = document.querySelectorAll('#editAppForm')[0];
        if (!form.checkValidity()) {
            //form is invalid, broadcast submit event
            //note this can't be done with form.submit() as this
            //will not update the UI input fields with validation info
            $('<input type="submit">').hide().appendTo(form).click().remove();
        }
        else{
            form.classList.add('was-validated')
            console.log("Sumitting Poster job");
            const data = new FormData($("#editAppForm").get()[0]);
            if(data['Department'] == "Other")
            {
                data['Department'] = data['otherDepartment'];
                console.log("other overriding department");
            }
            const formJSON = Object.fromEntries(data.entries());
            var id = formJSON.ApplicationId;
            console.log(`Making poster with data: ${JSON.stringify(formJSON)}`);
            event.preventDefault();
            v = $.ajax({
                url: '../controller/controller_test.php?type=newJob', //Inform that controller should insert data to 
                type: "POST",
                dataType:"json", //add json datatype to get json
                data: formJSON,
                success: function( responseData, textStatus, jQxhr ){
                    console.log(`responseData: ${JSON.stringify(responseData)}`);
                    console.log(`success: ${responseData['success']}`);
                    $("#footerNotice").show();
                    if(responseData['success'])
                    {
                        console.log("success");
                        const toast = new bootstrap.Toast($("#liveToast"));
                        $("#liveToastHead").text("Poster Job Accepted");
                        $("#liveToastHead").addClass("text-secondary");
                        $("#liveToastHead").removeClass("text-danger");
                        $("#liveToastSmall").text("Success");
                        $("#liveToastBody").html(`Poster added, view in Jobs section to process.`);
                        toast.show()
                        $("#EditAppModal").modal('hide');
                        $("#EditAppModal").modal('dispose');
                        console.log("Done showing toast");
                        // $("#footerNotice").text("Job Created");
                        // $("#footerNotice").fadeOut(4000);
                    }
                    else{
                        console.log(`${responseData['error']}`)
                        const toast = new bootstrap.Toast($("#liveToast"));
                        $("#footerNotice").text(`${responseData['error']}`);
                        $("#liveToastHead").text("Adding Job Failed");
                        $("#liveToastHead").addClass("text-danger");
                        $("#liveToastHead").removeClass("text-secondary");
                        $("#liveToastSmall").text("Job Not  Added");
                        $("#liveToastBody").html(`Could not insert new job into database properly. If the problem persists please contact Kirk.`);
                        toast.show()
                    }     

                },
                error: function(jqXHR, status, errorThrown){
                    console.log(`ajax error ${errorThrown} status: ${status}`);
                }
                
            }); 
        }
    })

    
    $(document).on('click', "#sendProblemEmail", function(event){
        $("#sendProblemEmail").data("emailAddress", $("#Email").val());
        $("#sendProblemEmail").data("FirstName", $("#FirstName").val());
        $("#sendProblemEmail").data("LastName", $("#LastName").val());
        const myModal = new bootstrap.Modal(document.getElementById('emailModal'));
        console.log(`Called email on poster: ${ $('#ApplicationId').val()}`);
        
        $("#emailModal").data('id', $('#ApplicationId').val());
        
        console.log(`${$("#sendProblemEmail").data("emailAddress")} <---`);

        var posterNo = $("#emailModal").data("id");
        console.log("emailModalId = " + posterNo);
        myModal.show();
    })

    $(document).on('change', '#presetEmailSelect', function(event){
        // console.log("changing email type");

        var problemType = $("#presetEmailSelect").val();
        const recipient = $("#sendProblemEmail").data("emailAddress");
        const firstName = $("#sendProblemEmail").data("FirstName");
        const lastName = $("#sendProblemEmail").data("LastName");
    
        console.log(`changine email to ${problemType}`);
        //ajax call to get email text:
        var jqXHRResponse = $.ajax({
            url: `../controller/controller_test.php?type=emailText&emailType=${problemType}`,
            type: "GET",
            async: false,
            dataType: "json",
            success: function( responseData, textStatus, jQxhr ){
                console.log(responseData);
                // myObj = JSON.parse(responseData);
                console.log("Heard back");
                console.log(responseData.success);
                if(responseData.success)
                {
                    console.log(`response text: ${responseData.text}`);
                    // $("#emailTextArea").val(responseData.text);
                    $("#emailTextArea").val(generateEmailText(firstName, lastName, responseData.text));
                    // row = JSON.parse(this.responseData.data);
                }
                else
                {
                    console.log("Not successful");
                }
            }
        });
    })


    $(document).on('click', '#sendEmailBtn', function(event){
        //grab text send to controller to send email
        var emailText = $("#emailTextArea").val();
        var toAddress = $("#emailAddressNotice").val();
        var posterNo = $("#emailModal").data("id");
        console.log("emailModalId = " + posterNo);
        jsonData = {"text": emailText};
        console.log("sending email with text"+emailText);
        var jqXHRResponse = $.ajax({
            url: `../controller/controller_test.php?type=problemEmail&to=${toAddress}`,
            type: "PUT",
            async: false,
            dataType: "json",
            data: jsonData,
            success: function( responseData, textStatus, jQxhr ){
                console.log(responseData);
                // myObj = JSON.parse(responseData);
                console.log(responseData.success);
                if(responseData.success)
                {
                    console.log("successful, returning true");
                    const toast = new bootstrap.Toast($("#liveToast"));
                    $("#liveToastHead").text("Email Sent");
                    $("#liveToastHead").addClass("text-secondary");
                    $("#liveToastHead").removeClass("text-danger");
                    $("#liveToastSmall").text("Success");
                    $("#liveToastBody").html(`Your email to user ${toAddress} has been sent.`);
                    toast.show()
                    putApplicationOnHold(posterNo).then(function(){
                        console.log("finished putting on hold");
                    })
                    // console.log(`response text: ${responseData.text}`);
                    // $("#emailTextArea").val(responseData.text);
                    // $("#emailTextArea").val(generateEmailText(firstName, lastName, responseData.text));
                    // row = JSON.parse(this.responseData.data);
                }
                else
                {
                    const toast = new bootstrap.Toast($("#liveToast"));
                    $("#liveToastHead").text("Email Failed");
                    $("#liveToastHead").addClass("text-danger");
                    $("#liveToastHead").removeClass("text-secondary");
                    $("#liveToastSmall").text("Failed");
                    $("#liveToastBody").html(`Could not update discount To $${newDiscount} per ft<sup>2</sup>`);
                    toast.show()
                    console.log("Not successful");
                }
            }
        });
    })


    $(document).on('shown.bs.modal', "#emailModal", function(event){
        console.log("showing the bs modal");
        const button = event.relatedTarget;
        const recipient = $("#sendProblemEmail").data("emailAddress");
        const firstName = $("#sendProblemEmail").data("FirstName");
        const lastName = $("#sendProblemEmail").data("LastName");
        $("#emailAddressNotice").val(`${recipient}`);
        $("#emailTextArea").val(generateEmailText(firstName, lastName, ""));
    })

    //accept a job, poster is assumed to have correct data and be ready for processing.
    $(document).on('click', "#continueBtn", function(){
        //user wishes to continue with adding the poster job
        // here, we hide the warning and show the new form fields
        // necessary to add the job. Also reset the form validation.
        $('#acceptJobWarning').hide();
        //show accept job collapse menu
        $('#addJob').show();
        console.log(config.courses);
        Object.keys(config.courses).forEach( function(key) {
            course = config.courses[key].courseNo;
            dept = config.courses[key].department;
            year = config.courses[key].year;
            // console.log(`value: ${key}`);
            thisYear = new Date().getYear() + 1900;
            console.log(`comparing ${year} to ${thisYear -1}/${thisYear}`);
            if(year == `${thisYear -1}/${thisYear}`)
            {
                $('#Course').append($('<option>', 
                {
                    value:`${course}`,
                    text:`${course}: ${dept}`
                }));
            }
            
        })
        
        const form = document.querySelectorAll('#editAppForm')[0];
        $('#editAppForm').removeClass("was-validated"); //reset validation tips
        $(".addJobField").attr('disabled', false);
        $('#approveBtn').hide();
    });

    
    $("#PosterFile").on('change', () => {
            console.log("changed to link?");
            if ($("#PosterFile").val().toLowerCase() != "email") {
                //we hve a link we can open
                console.log("YES!");
                $("#openFileBtn").show();
            }
            else
            {
                $("#openFileBtn").hide();
            }
    });

    $(document).on('click', "#openFileBtn", function(){
        window.open($("#PosterFile").val());
    });
    

    $(document).on('change', "#Width", function() {
        console.log(`changed width to ${$("#Width").val()}`)
        $("#Cost").val(updatePrice($("#Width").val(), $("#Height").val(), config.settings.cost));
    })

    $(document).on('change', "#Height", function() {
        $("#Cost").val(updatePrice($("#Width").val(), $("#Height").val(), config.settings.cost));
    })

    $(document).on('change', "#Units", function() {
        $("#Cost").val(updatePrice($("#Width").val(), $("#Height").val(), config.settings.cost));
    })


    $(document).on('change', "#applyDiscountSwitch", function(event){
        if($(this).is(":checked"))
        {
            // $(".discountField").show();
            $(".discountField").attr('disabled', false);
            $(".discountField").attr('hidden', false);
            //get the discount value
            getDiscount().then((value) => 
            {
                size = getFeetSquaredSize();
                quantity = $("#Quantity").val();
                totalDiscount = value * quantity;
                $("#discountInput").val(parseFloat(totalDiscount).toFixed(2));
            });
        }
        else{
            // $(".discountField").hide();
            $(".discountField").attr('disabled', true);
            $(".discountField").attr('hidden', true);
        }
        
    })

    $(document).on('click', "#resetTotalBtn", function(event) {
        $("#Cost").val(0);
        $("#quantityInput").val(1);
        $("#totalInput").val(0);
    })
    

    $(document).on('click', "#calculateCostBtn", async function(event) {
        //calculate the cost
        getSettings('all', config); //update config with settings
        console.log(config.settings);
        if(!config.settings.cost)
        {
            $("#footerNotice").html("Cannot get cost");
        }
        else
        {
            var cost = $("#Cost").val();
            var quantity = $("#Quantity").val();
            var discount =  $("#discountInput").val();

            var total = cost*quantity - discount;

            // costVal = updatePrice($("#Width").val(), $("#Height").val(), config.settings.cost);
            // cost = $("#PaymentType").val() == "Cash"? roundDown(costVal).toFixed(2): costVal;
            // $("#Cost").val(cost);
            // size = getFeetSquaredSize();
            // console.log("size: "+size);

            // var discount = $("#applyDiscountSwitch").prop("checked") ? (await getDiscount()) : 0.0;
            // console.log("discount: "+ discount);
            // Per sq foot discount: Uncomment below if using a discount based on a discount per sq foot
            // discount = discount * size;
            // $("#discountInput").val(parseFloat(discount).toFixed(2));
            // var quantity = $("#Quantity").val();
            // console.log("discount: "+ discount);
            console.log(`Cost = ${cost} discount = ${discount}, quantity = ${quantity}`);

            // totalDiscount = 
            
            // var total = quantity * ($("#Cost").val() - $("#discountInput").val());
            // var total = ($("#Cost").val() - $("#discountInput").val());
            var roundedTotal = $("#PaymentType").val() == "Cash"? roundDown(total) : total;
            console.log(`total:${roundedTotal}`)
            
            $("#totalInput").val(roundedTotal.toFixed(2));
        }

    })


    $(document).on('click', "#resetCostBtn", function(){
        $("#Cost").val(parseFloat(roundDown(updatePrice($("#Width").val(), $("#Height").val(),  config.settings.cost))).toFixed(2));
    });
    // Accepting job and adding to db.
    // $(document).on('click', "#addJobBtn", function(event){
    //     console.log("Approving work");
    //     event.preventDefault();
    //     const form = document.querySelectorAll('#editAppForm')[0];
    //     if (!form.checkValidity()) {
    //         //form is invalid, broadcast submit event
    //         console.log("form not valid");
    //         //note this can't be done with form.submit() as this
    //         //will not update the UI input fields with validation info
    //         $('<input type="submit">').hide().appendTo(form).click().remove();
    //     }
    //     else{
    //         form.classList.add('was-validated')
    //         console.log("Poster info valid, submitting Poster job");
    //         const data = new FormData($("#editAppForm").get()[0]);
    //         const formJSON = Object.fromEntries(data.entries());
    //         var id = formJSON.ApplicationId;
    //         console.log(JSON.stringify(formJSON));
    //         event.preventDefault();
    //         $.ajax({
    //             url: '../controller/controller_test.php?type=newJob', //Inform that controller should insert data to 
    //             type: "POST",
    //             dataType: "json",
    //             data: formJSON,
    //             success: function( data, textStatus, jQxhr ){
    //                 console.log(textStatus);
    //                 console.log("heardback");
    //                 console.log(JSON.stringify(data));
    //                 $("#footerNotice").show();
    //                 if(data["success"] == true)
    //                 {
    //                     $("#footerNotice").text("Updated");
    //                     $("#footerNotice").fadeOut(4000);
    //                 }
    //                 else{
    //                     $("#footerNotice").text("Could Not Update!");
    //                 }     
    //             }
    //         }); 
    //     }
    // })
        
    $(document).on('change', "#Position", function () {
        if($(this).val() == "Undergraduate")
        {
            console.log("enable ugrad");
            $(".undergradData").prop("disabled", (i, v) => false);
            $(".undergradData").prop("hidden", (i, v) => false);
        }
        else{
            console.log("not Undergrad");
            $(".undergradData").prop("disabled", (i, v) => true);
            $(".undergradData").prop("hidden", (i, v) => true);
        }
    })

    $(document).on('click', "#ApprovePoster", function () {
        if($(this).text() == "Back")
        {
            //hide warning
            $('#acceptJobWarning').hide();
        }
        else
        {
            $('#acceptJobWarning').show();
        }
        $('#modalContainer').show();
        $("#modalSubmitBtn").prop("hidden", (i, v) => !v);
        if($("#modalSubmitBtn").prop("hidden"))
        {
            $(this).text("Back");
        } 
        else
        {
            $(this).text("Accept Job");
        }
    })

    $(document).on('click', "#closeAddJobBtn", function (e) {
        //user closes the add job section, collapse and disable inputs
        // so that user can still edit the application fields.
        // bring back the bottom update button. 
        $("#addJob").hide();
        $(".addJobField").attr('disabled', true);
        $("#approveBtn").show();
        $("#modalSubmitBtn").prop("hidden", false);
        $("#ApprovePoster").text("Accept Job");
        e.preventDefault();
    })
    

    $(document).on('blur', '#PosterFile', function(){
        $("#PosterFile").prop("readonly", true);
        $("#editButtonSvg").removeClass("d-none");
        $("#saveButtonSvg").addClass("d-none");
    })

    $(document).on('click', '#editFileBtn', function(){
        console.log("switch");
        if($("#PosterFile").is('[readonly]'))
        {
            $("#PosterFile").removeAttr("readonly")
            $("#editButtonSvg").addClass("d-none");
            $("#saveButtonSvg").removeClass("d-none");
        }
        else
        {
            $("#PosterFile").prop("readonly", true);
            $("#editButtonSvg").removeClass("d-none");
            $("#saveButtonSvg").addClass("d-none");
        }
        
    })


    //When the user has clicked on delete
    $(document).on('show.bs.collapse', '#deleteAppBtn', function(){
        console.log("adjusting to none");
        $("#deleteAppBtn").addClass('d-none');
    });

    $(document).on('hide.bs.collapse', '#deleteAppBtn', function(){
        console.log("adjusting to none");
        $("#deleteAppBtn").removeClass('d-none');
    });
    // $(document).on('click', '#deleteAppBtn', function(){
    //     console.log("adjusting to none");
    //     $("#deleteAppBtn").addClass('d-none');
    // });

    // $(document).on('click', '#ConfirmDeleteBackBtn', function(){
    //     $("#deleteAppBtn").removeClass('d-none');
    // });

    // $(document).on('click','#ConfirmDeleteYesBtn', function(){
    //     $("#EditAppModal").modal("hide");
    // });
   
    $(document).on('click','#ConfirmDeleteYesBtn', function(){
        var appId = $("#ApplicationId").val();
        // console.log(`delete app ${$("#ApplicationId").val()}`);
        var pos = $("#Position").val();
        console.log(`${pos}`);
        console.log(`clickedDelete on app ${appId}`);
        deleteApp($("#ApplicationId").val()).then(function (value) {
            console.log(`promised value = ${value}`);
            if(value)
            {
                $("#EditAppModal").modal("hide");
                showApps(tableFields);
            }
            else
            {
                alert("nope");
            }
        })
    })

    $(document).on('change', "#PaymentType", function () {
        console.log("spchannngeode");
        if($(this).val() == "SpeedCode")
        {
            console.log("enable speed");
            $(".speedCodeData").prop("disabled", false);
        }
        else{
            console.log("no speed");
            $(".speedCodeData").prop("disabled", true);
        }
    })

        //submit button has been clicked
    $(document).on('click', "#modalSubmitBtn", function(event){
        console.log("submit hit");
        const form = document.querySelectorAll('#editAppForm')[0];
        
        if (!form.checkValidity()) {
            //form is invalid, snd out submit event
            //note this can't be done with form.submit() as this
            //will not update the UI input fields with validation info
            console.log("Invalid Form here");
            $('<input type="submit">').hide().appendTo(form).click().remove();
            $('#footerNotice').addClass("danger").html("Bad input");
        }
        else{
            form.classList.add('was-validated')
            console.log("good to go, sending update");

            // form = $('#editAppForm');
            
            const data = new FormData($("#editAppForm").get()[0]);
            
            const formJSON = Object.fromEntries(data.entries());
            if(formJSON.Department == "Other")
            {
                console.log(`other department, saving department as ${$("#otherDepartment").val()}`);
                formJSON.Department = $("#otherDepartment").val();
                delete formJSON.otherDepartment;
            }
            delete formJSON.otherDepartment;
            if(formJSON.GrantHoldersDepartment == "Other")
            {
                console.log(`other grantholder department, saving department as ${$("#otherGrantHoldersDepartment").val()}`);
                formJSON.GrantHoldersDepartment = $("#otherGrantHoldersDepartment").val();
                
            }
            delete formJSON.otherGrantHoldersDepartment;
            var id = formJSON.ApplicationId;
            console.log(JSON.stringify(formJSON));
            $.ajax({
                url: '../controller/controller_test.php?type=app&id='+id, //This is the current doc
                type: "PUT",
                async: false,
                dataType: "json",
                data: formJSON,
                success: function(data, textStatus, jQxhr ){
                    console.log(`data: ${JSON.stringify(data)}`);
                    if(data['success'])
                    {
                        console.log("successfully updated");
                        showToastSuccess("Updated App", "Success", "Application data has been updated.");
                        $("#footerNotice").html("Updated");
                        $("#footerNotice").fadeOut(2000);
                    }
                    else
                    {
                        console.log("Did not update");
                        $("#footerNotice").html("COULD NOT UPDATE!");
                        showToas("Warning App Update", "Failed", "Could not save application data.");
                    }
                }
            });

        }
    })

    //#endregion
    


    
    //#region Settings Page
    $(document).on('click', '#button-updateDiscount', function(){
        console.log("updating discount");
        newDiscount = $("#studentDiscount").val();
        console.log("Updating discount to"+newDiscount);
        $.ajax({
            url: '../controller/controller_test.php?type=Setting&ssscDiscount='+newDiscount, //This is the current doc
            type: "PUT",
            async: true,
            dataType: "json",
            success: function( data, textStatus, jQxhr ){
                console.log(`data: ${JSON.stringify(data)}`);
                if(data['success'])
                {
                    console.log("successful, returning true");
                    // $("#posterCost").val(newDiscount);
                    $("#button-updateDiscount").addClass("btn-success");
                    $("#button-updateDiscount").removeClass("btn-outline-secondary");
                    $("#button-updateDiscount").removeClass("btn-danger");
                    const toast = new bootstrap.Toast($("#liveToast"));
                    $("#liveToastHead").text("Updated Discount");
                    $("#liveToastHead").addClass("text-secondary");
                    $("#liveToastHead").removeClass("text-danger");
                    $("#liveToastSmall").text("Success");
                    $("#liveToastBody").html(`Updated Discount to $${newDiscount} per ft<sup>2</sup>`);
                    toast.show()
                }
                else{
                    console.log("failed");
                    $("#button-updateupdateDiscount").addClass("btn-danger");
                    $("#button-updateDiscount").removeClass("btn-outline-secondary");
                    $("#button-updatediscount").removeClass("btn-success");
                    const toast = new bootstrap.Toast($("#liveToast"));
                    $("#liveToastHead").text("Update Discount Failed");
                    $("#liveToastHead").addClass("text-danger");
                    $("#liveToastHead").removeClass("text-secondary");
                    $("#liveToastSmall").text("Failed");
                    $("#liveToastBody").html(`Could not update discount To $${newDiscount} per ft<sup>2</sup>`);
                    toast.show()
                }
            }
        });
    })

    $(document).on('click', '#button-updatePrice', function(){
        
        newCost = $("#posterCost").val();
        console.log("button update {newCost}"+newCost);
        $.ajax({
            url: '../controller/controller_test.php?type=Setting&cost='+newCost, //This is the current doc
            type: "PUT",
            async: true,
            dataType: "json",
            success: function( data, textStatus, jQxhr ){
                console.log(`data: ${JSON.stringify(data)}`);
                if(data['success'])
                {
                    console.log("successful, returning true");
                    $("#posterCost").val(newCost);
                    $("#button-updatePrice").addClass("btn-success");
                    $("#button-updatePrice").removeClass("btn-outline-secondary");
                    $("#button-updatePrice").removeClass("btn-danger");
                    const toast = new bootstrap.Toast($("#liveToast"));
                    $("#liveToastHead").text("Updated Cost");
                    $("#liveToastHead").addClass("text-secondary");
                    $("#liveToastHead").removeClass("text-danger");
                    $("#liveToastSmall").text("Success");
                    $("#liveToastBody").html(`Updated Cost To $${newCost} per ft<sup>2</sup>`);
                    toast.show()
                }
                else{
                    console.log("failed");
                    $("#button-updatePrice").addClass("btn-danger");
                    $("#button-updatePrice").removeClass("btn-outline-secondary");
                    $("#button-updatePrice").removeClass("btn-success");
                    const toast = new bootstrap.Toast($("#liveToast"));
                    $("#liveToastHead").text("Update Cost Failed");
                    $("#liveToastHead").addClass("text-danger");
                    $("#liveToastHead").removeClass("text-secondary");
                    $("#liveToastSmall").text("Failed");
                    $("#liveToastBody").html(`Could not update Cost To $${newCost} per ft<sup>2</sup>`);
                    toast.show()
                }
            }
        });
    })

    $(document).on('show.bs.collapse', "#collapseOne", function() {
        $("#undergradCourseList").empty()
        console.log(`Getting Courses`);
        var suc = false;
        $.ajax({
            url: '../controller/controller_test.php?type=courses', //This is the current doc
            type: "GET",
            async: false,
            dataType: "json",
            success: function( data, textStatus, jQxhr ){
                console.log(data);
                // console.log(`data: ${JSON.stringify(data)}`);
                // console.log(`data: ${data}`);
                // console.log(`data: ${data["data"]}`);
                for(obj in data["data"])
                {
                    
                    obj = data["data"][obj];
                    console.log(`course: ${obj.courseNo}`);
                    // console.log("obj: "+obj);
                    $("#undergradCourseList").append(`<li class="list-group-item">
                    ${obj.courseNo} - ${obj.department} ${obj.year}<button type="button" class="DeleteCourseBtn btn btn-danger float-end" data-courseno="${obj.courseNo}" data-department="${obj.department}" data-year="${obj.year}" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" onclick="deleteCourse(this)"=>Delete</button>
                    </li>`);
                }
            }
        });
    })

    $("#externalAppToggle").change( function() {
        if(this.checked)
        {
            console.log("ischecked");
            //update settings
            $.ajax({
                url: '../controller/controller_test.php?type=Setting&external=true', //This is the current doc
                type: "PUT",
                async: true,
                dataType: "json",
                success: function( data, textStatus, jQxhr ){
                    console.log(`data: ${JSON.stringify(data)}`);
                    if(data['success'])
                    {
                        console.log("successful, returning true");
                        $("#externalAppToggle").prop("checked", true);
                    }
                    else{
                        $("#externalAppToggle").prop("checked", false);
                    }
                }
            });
        }
        else
        {
            console.log("is not checked");
            $.ajax({
                url: '../controller/controller_test.php?type=Setting&external=false', //This is the current doc
                type: "PUT",
                async: true,
                dataType: "json",
                success: function( data, textStatus, jQxhr ){
                    console.log(`data: ${JSON.stringify(data)}`);
                    if(data['success'])
                    {
                        console.log("successful, returning true");
                        $("#externalAppToggle").prop("checked", false);
                    }
                    else
                    {
                        console.log("Failed to disabled external setting, switching undergrad back on");
                        $("#externalAppToggle").prop("checked", true);
                    }
                }
            });
        }
        
    })
    
    $("#undergradAppToggle").change( function() {
        if(this.checked)
        {
            console.log("ischecked");
            //update settings
            $.ajax({
                url: '../controller/controller_test.php?type=Setting&undergrad=true', //This is the current doc
                type: "PUT",
                async: true,
                dataType: "json",
                success: function( data, textStatus, jQxhr ){
                    console.log(`data: ${JSON.stringify(data)}`);
                    if(data['success'])
                    {
                        console.log("successful, returning true");
                        $("#undergradAppToggle").prop("checked", true);
                    }
                    else{
                        $("#undergradAppToggle").prop("checked", false);
                    }
                }
            });
        }
        else
        {
            console.log("is not checked");
            $.ajax({
                url: '../controller/controller_test.php?type=Setting&undergrad=false', //This is the current doc
                type: "PUT",
                async: true,
                dataType: "json",
                success: function( data, textStatus, jQxhr ){
                    console.log(`data: ${JSON.stringify(data)}`);
                    if(data['success'])
                    {
                        console.log("successful, returning true");
                        $("#undergradAppToggle").prop("checked", false);
                    }
                    else
                    {
                        console.log("Failed to disabled undergrad app setting, switching undergrad back on");
                        $("#undergradAppToggle").prop("checked", true);
                    }
                }
            });
        }
        
    })

    $(document).on('click', "#copyExternalLink", function(){
        navigator.clipboard.writeText("https://ssts.uwo.ca/external_poster_form.html");
    })

    
    $(document).on('click', '#addCourseBtn', async function(){
        if($('#addCourseForm').valid())
        {
            console.log("sending new course to db");
            var courseNum = $('#addCourseNumber').val();
            var courseYear = $("#addCourseYear").val();
            var courseDep = $("#addCourseDepartment").val();
            if(await addNewCourse(courseNum, courseDep, courseYear))
            {
                console.log("done");
                $("#collapseOne").trigger("show.bs.collapse");
                //refresh ui
                const toast = new bootstrap.Toast($("#liveToast"));
                $("#liveToastHead").text("Added Course");
                $("#liveToastHead").addClass("text-secondary");
                $("#liveToastHead").removeClass("text-danger");
                $("#liveToastSmall").text("Success");
                $("#liveToastBody").html(`Added new course`);
                toast.show()
            }
            else
            {
                const toast = new bootstrap.Toast($("#liveToast"));
                $("#liveToastHead").text("Faield to Add Course");
                $("#liveToastHead").addClass("text-danger");
                $("#liveToastHead").removeClass("text-secondary");
                $("#liveToastSmall").text("Failed");
                $("#liveToastBody").html(`Could not add new course`);
                toast.show();
                console.log("Not successful");
            }
        }
    })

    $(document).on('click', '#button-SDFDeposit', async function(){
        //Value from ui
        var addVal = $("#SDFDeposit").val();
        updateSDFBalance('deposit', addVal).then(async (success) => {
            if(success)
            {
                //update UI to show new blanace
                $("#remainingSDF").text(await getSDFBalance());
                const toast = new bootstrap.Toast($("#liveToast"));
                $("#liveToastHead").text("Deposit Made");
                $("#liveToastHead").addClass("text-secondary");
                $("#liveToastHead").removeClass("text-danger");
                $("#liveToastSmall").text(`Deposited ${addVal} into SDF`);
                $("#liveToastBody").html(`Deposit Complete.`);
                toast.show()
                $("#depositCollapse").collapse('hide');
            }
            else
            {
                const toast = new bootstrap.Toast($("#liveToast"));
                $("#footerNotice").text(`Error updating balance`);
                $("#liveToastHead").text("Could not update SDF Balance");
                $("#liveToastHead").addClass("text-danger");
                $("#liveToastHead").removeClass("text-secondary");
                $("#liveToastSmall").text("Please check databse to ensure funds are accurate");
                $("#liveToastBody").html(`If the problem persists please contact Kirk.`);
                toast.show()
            }
        })
    })

    $(document).on('click', '#button-SDFWithdrawal', async function(){
        //Value from ui
        var addVal = $("#SDFWithdrawal").val();
        updateSDFBalance('Withdrawal', addVal).then(async (success) => {
            if(success)
            {
                //update UI to show new blanace
                $("#remainingSDF").text(await getSDFBalance());
                const toast = new bootstrap.Toast($("#liveToast"));
                $("#liveToastHead").text("Withdrawal Made");
                $("#liveToastHead").addClass("text-secondary");
                $("#liveToastHead").removeClass("text-danger");
                $("#liveToastSmall").text(`Withdrawal ${addVal} from SDF`);
                $("#liveToastBody").html(`Withdrawal Complete.`);
                toast.show()
                $("#withdrawalCollapse").collapse('hide');
            }
            else
            {
                const toast = new bootstrap.Toast($("#liveToast"));
                $("#footerNotice").text(`Error updating balance`);
                $("#liveToastHead").text("Could not Withdrawal SDF Balance");
                $("#liveToastHead").addClass("text-danger");
                $("#liveToastHead").removeClass("text-secondary");
                $("#liveToastSmall").text("Please check databse to ensure funds are accurate");
                $("#liveToastBody").html(`If the problem persists please contact Kirk.`);
                toast.show()
            }
        })
    })
//#endregion


    //#region Reports Page
    $(document).on('show.bs.tab', "#pills-reports-tab", function(){
        console.log("showing reports");
    })
    var triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))
    triggerTabList.forEach(function (triggerEl) {
    var tabTrigger = new bootstrap.Tab(triggerEl)

    triggerEl.addEventListener('click', function (event) {
        event.preventDefault()
        tabTrigger.show()
    })
    })
    // #endregion


    //Jobs Page
    // #region Jobs
    $(document).on('click','.jobTableRow', function(){
        // console.log("showmodal");
        var row = $(this).closest("tr");
        var id = this.id.substring(6);
        console.log(id)
        expandJob(id)
        // var email = row.find("#ReqEmail").html();
        // $(`#${id} #ReqEmail`).html();
        // var name = $(`#${id} #Requisitioner`).html();
        // console.log(`sending email to ${name}: ${email}: ${id}`);
    })

    
    $(document).on('click', '#printRecieptBtn', function(){
        //here we pop out the print reciept options
        //First grow the modal;
        //
        console.log("showing reciept form");
        id =  $('#editPosterForm').data('id');
        $("#posterJobModal").addClass("modal-lg");
        updateReceiptButtons(id);
        $(".recieptOptions").show();
        
        console.log("getting reciept info for poster:"+id);
        addReceiptInfo(id);
        
    });


    $(document).on('submit', "#editPosterForm", function(){
        console.log("submit the form somehow?");
    })

    $(document).on('click', '#savePDFBtn', function (){
        console.log("sending receipt data to pdf");
        //check that all data is present here. 
        const data = new FormData($("#editPosterForm").get()[0]);
        const formJSON = Object.fromEntries(data.entries());
        console.log(formJSON);
        $.ajax({
            url: '../controller/controller_test.php?type=receiptPDF', //Inform that controller should insert data to 
            type: "POST",
            // dataType:"json", //add json datatype to get json
            data: formJSON,
            xhrFields: {
                responseType: 'blob'
            },
            success: function( responseData, textStatus, jQxhr ){
                console.log(`responseData: ${JSON.stringify(responseData)}`);
                console.log(`success: ${responseData['success']}`);
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(responseData);
                a.href = url;
                a.download = 'myfile.pdf';
                document.body.append(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            },
            error: function(jqXHR, status, errorThrown){
                console.log(`ajax error ${errorThrown} status: ${status}`);
            }
            
        }); 
        //put receipt data into pdf
        console.log("reached");
    });

    
    $(document).on('click', '#emailPDFToReqBtn', function (){
        console.log("Emailing receipt data to pdf");
        //check that all data is present here. 
        const data = new FormData($("#editPosterForm").get()[0]);
        const formJSON = Object.fromEntries(data.entries());
        emailTo = $("#receiptReqEmail").val();
        console.log("emailing to "+ emailTo);
        console.log(formJSON);
        emailReceipt(emailTo, formJSON).then(setRecieptStatus(1));
        //put receipt data into pdf
        console.log("reached end of email to req");
    });

    $(document).on('click', '#emailPDFToGHBtn', function (){
        console.log("Emailing receipt data to pdf");
        //check that all data is present here. 
        const data = new FormData($("#editPosterForm").get()[0]);
        const formJSON = Object.fromEntries(data.entries());
        emailTo = "grantHolder";
        console.log("emailing to "+ emailTo);
        console.log(formJSON);
        emailReceipt(emailTo, formJSON).then(setRecieptStatus(2));
        // setRecieptStatus(4);
    });

    $(document).on('click', '#emailPDFToAABtn', function (){
        console.log("Emailing receipt data to pdf");
        //check that all data is present here. 
        const data = new FormData($("#editPosterForm").get()[0]);
        const formJSON = Object.fromEntries(data.entries());
        emailTo = "AdministrativeAssistant";
        console.log("emailing to "+ emailTo);
        console.log(formJSON);
        emailReceipt(emailTo, formJSON).then(setRecieptStatus(4));
    });

    //Job has been printed, update the db with print date, pickup stays as no, update UI to show
    // the new poster state
    $(document).on('click','#printedPosterBtn', async function(){
        //print date will be today (yyyy-mm-dd)
        today = new Date()
        dateString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        console.log("using date: "+ dateString);

        var posterID = $("#editPosterForm").data('id');

        if(await updatePrintDate(posterID, dateString))
        {
            updatePosterState("printedPoster");
        }
        console.log("updating ui");

    });
    
    $(document).on('click','#pickUpBtn', function(){
        var id = $("#editPosterForm").data('id');
        console.log(`notifying ${id}`);
        $.ajax({
            url: '../controller/controller_test.php?type=requestPickup&id='+id, //Inform that controller should insert data to 
            type: "PUT",
            async: true,
            dataType: "json",
            success: async function( responseData, textStatus, jQxhr ){
                console.log(responseData);
                myObj = responseData.data;
                if(responseData['success'] == true)
                {
                    console.log("email sent successfully");
                    if(await setState(id, 'pending'))
                    {
                        console.log("updatng posterstate");
                        updatePosterState('needsPickUp');
                    }
                    else
                    {
                        console.log("not updated in DB not updating");
                    }
                }
            }
        }); 

    })


    $(document).on('click', "#confirmPickupBtn", async function(){
        var id = $("#editPosterForm").data('id');
        console.log(`notifying ${id}`);
        if(await setState(id, 'yes'))
        {
            console.log("updatng posterstate");
            updatePosterState('completedPoster');
        }
        else
        {
            console.log("not updated in DB not updating");
        }
    });

    $(document).on('hidden.bs.modal', "#editPosterModal", function(event){ 
        // showApps(tableFields);
        getJobs(150, 0);
    })


// #endregion
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});


async function setRecieptStatus(bits)
{
    id =  $('#editPosterForm').data('id');
    oldbits = await getReceiptStatus(id);
    newbits = oldbits | bits;
    console.log(`old: ${oldbits} new: ${newbits}`);
    if(oldbits != newbits)
    {
        options = {
            method: 'PUT',
        }
        fetch(`../controller/controller_test.php?type=receiptstatus&id=${id}&bits=${newbits}`, options)
        .then( response => response.json())
        .then( json => {
            console.log(JSON.stringify(json));
            if(json.success)
            {
                setReceiptButtons(newbits);
            }
        })
        
    }
}

function showApps(tableFields) {
    // var tableBody = document.getElementById("appTable").getElementsByTagName('tbody')[0];
    // tableBody.innerHTML = "";
    // console.log("test");
    var tableBody = document.getElementById("appTable").getElementsByTagName('tbody')[0];
    if(tableBody)
    {
        parent = tableBody.parentNode;
        var newBody = document.createElement('tbody');
        newBody.id = 'tableBody';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            console.log("ready state has changes");
            if (this.readyState == 4 && this.status == 200) {
                // console.log(this.responseText);
                myObj = JSON.parse(this.responseText);
                //Iterate through every json object returned from model
                for (let x in myObj) {
                    //for each entry in the db make a new row in the table
                    var row = newBody.insertRow(-1);
                    row.id = myObj[x].ApplicationId;
                    row.classList.add("applicationTableRow")
                    // console.log("item");
                    // console.log("adding: rowid:" + row.id);
                    for(let field in myObj[x])
                    {
                        
                        if(tableFields.includes(field))
                        {
                            // console.log(field);
                            var cell = row.insertCell();
                            cell.innerHTML = myObj[x][field];
                        }
                        if(myObj[x][field] == "On Hold")
                        {
                            $(row).addClass("table-warning");
                        }
                    }
                }
                parent.removeChild(tableBody);
                parent.appendChild(newBody);   
            }
            else
            {
                console.log("faileds");
            }
            
        };
    }
    console.log("reached");
    xmlhttp.open("GET", "..\\controller\\controller_test.php?type=allApps");
    xmlhttp.send();
}


async function expandApp(id){
    //ajax call to get app info and update modal
    var jqXHRResponse = $.ajax({
        url: "../controller/controller_test.php?type=getApp&id="+id, //This is the current doc
        type: "GET",
        async: false,
        dataType: "json",
        success: function( responseData, textStatus, jQxhr ){
            console.log(`data: ${JSON.stringify(responseData)}`);
            // console.log(responseData);
            // myObj = JSON.parse(responseData);
            myObj = responseData;
            console.log(myObj);

            if(myObj)
            {
                //We should only have one object coming from controller
                //need to make these editable parts of the form
                for(var item in myObj)
                {
                    //put in the ui modal
                    // console.log("item is");
                    // $(`#${item}`).val(myObj[item]);
                    if(myObj[item] != "N/A")
                    {
                        // console.log(`${item}: ${myObj[item]}`)
                        $(`#${item}`).val(myObj[item]).change();
                        $(`#${item}`).prop("disabled", false)
                    
                        if(item == "Department" || item=="GrantHoldersDepartment")
                        {
                            console.log(`on${item}: ${myObj[item]}`);
                            if(!departments.includes(myObj[item]))
                            {
                                $(`#${item}`).val("Other").change();
                                $(`#other${item}`).val(myObj[item]).change().prop("disabled", false);
                            }
                        }
                    }
                }
                console.log(`expanded app ${$("#ApplicationId").val()}`);
                $("#PosterName").val(`${id}_${$("#PosterName").val()}`);
                //have to do the approved status manually
                console.log(`${myObj.Approved}Switch being set`);
                $(`#${myObj.Approved}Switch`).prop("checked", true );
                $(`#${myObj.Approved}SwitchLabel`).prop("checked", true );
            }
        }
    });
    $("#EditAppModalTitle").html("Application # "+ id);
    // $('#modalContainer').show();
    $("#EditAppModal").modal('show');
    // Add in poster file name
}

function roundDown5(x)
{
    return x - (x % 5);
}

function roundDown(x)
{
    return x - (x % 1);
}

function expandJob(posterNo){
    
    var jqXHRResponse = $.ajax({
        url: '../controller/controller_test.php?type=job&id='+posterNo, //This is the current doc
        type: "GET",
        async: false,
        dataType: "json",
        success: function( data, textStatus, jQxhr ){
            console.log(`data: ${JSON.stringify(data)}`);
            if(data['success'])
            {
                
                console.log("successful, returning true");
                name = data['data']['Requisitioner']
                console.log("successful, returning true");
                $("#reqName").html(`${data['data']['Requisitioner']}`)
                $("#reqEmail").html(`${data['data']['ReqEmail']}`)
                $("#reqType").html(`${data['data']['RequisitionerType']}`)
                pickedUp = data['data']['PickUp'].toLowerCase();
                printDate = data['data']['PrintDate'];
                if(printDate){
                    if(pickedUp == "yes")
                    {
                        console.log("Completed Poster");
                        updatePosterState("completedPoster");
                    }
                    else if(pickedUp =="pending")
                    {
                        console.log("Pending Pickup");
                        updatePosterState("needsPickUp");
                    }
                    else
                    {
                        console.log("Needs to send pickupnoteice");
                        updatePosterState("printedPoster");
                    }
                }else
                {
                    console.log("Not yet printed");
                    updatePosterState("prePrintPoster");
                }
                $("#pickUp").html(`${pickedUp}`)
            }
        }
    });
    
    $("#editPosterModalTitle").html("Poster # "+ posterNo);
    $('#editPosterForm').data('id', posterNo);
    // $('#modalContainer').show();
    $("#editPosterModal").modal('show');
    // updateReceiptButtons(posterNo);
}


async function updateReceiptButtons(id)
{
    console.log("updating reciept buttons");
    // console.log(`../controller/controller_test.php?type=ReceiptStatus&id=${id}`);
    bits = await getReceiptStatus(id);
    setReceiptButtons(bits);
}

async function getReceiptStatus(id)
{
    console.log(`../controller/controller_test.php?type=ReceiptStatus&id=${id}`);
    return fetch(`../controller/controller_test.php?type=ReceiptStatus&id=${id}`,
    {
        method: 'get'
    })
    .then(function(res) {
        // console.log(`response json ${JSON.stringify(res.body)}`);
        // console.log(`response body${res.text()}`);
        return res.json()
    })
    .then(function(json){
        console.log(`response json ${JSON.stringify(json)}`);
        if(json.success)
        {
            return json.data;
        }
    });
}

function setReceiptButtons(bits)
{
    console.log("setting receipt buttons to "+bits);
    if(bits & 1)
    {
        //Requisitioner has been sent an email already
        receiptButtonSent("emailPDFToReqBtn");
    }
    else{
        receiptButtonNotSent("emailPDFToReqBtn");
    }

    if(bits & 2)
    {
        receiptButtonSent("emailPDFToGHBtn");
    }
    else{
        receiptButtonNotSent("emailPDFToGHBtn");
    }
    if(bits & 4)
    {
        receiptButtonSent("emailPDFToAABtn");
    }
    else{
        receiptButtonNotSent("emailPDFToAABtn");
    }
    if(bits & 8)
    {
        // receiptButtonSent("emailPDFToReqBtn");
    }
}

//Changes appearance of button with provided ID
function receiptButtonSent(id)
{
    $(`#${id}`).addClass("btn-outline-danger");
    $(`#${id}`).removeClass("btn-primary");
}

function receiptButtonNotSent(id)
{
    $(`#${id}`).removeClass("btn-outline-danger");
    $(`#${id}`).addClass("btn-primary");
}

function generateEmailText(firstName, lastName, content){
    return `Dear ${firstName} ${lastName},\n${content}`;
}

function showApproval() {
}

async function updatePrintDate(id, dateStamp){
    console.log(`Update ${id} print date to: ${dateStamp}`);
    var suc = false;
    var jqXHRResponse =  await $.ajax({
        url: `../controller/controller_test.php?type=printdate&id=${id}&date=${dateStamp}`, //This is the current doc
        type: "PUT",
        async: false,
        dataType: "json",
        success: function( data, textStatus, jQxhr ){
            console.log(`data: ${JSON.stringify(data)}`);
            if(data['success'])
            {
                console.log("successful, returning true");
            }
        }
    });
    if(jqXHRResponse['success'] == true)
    {
        return true;
    }
    else return false;
}

async function deleteApp(idNum)
{
    console.log(`js delete: ${idNum}`);
    var suc = false;
    var jqXHRResponse =  await $.ajax({
        url: '../controller/controller_test.php?type=App&id='+idNum, //This is the current doc
        type: "DELETE",
        async: false,
        dataType: "json",
        success: function( data, textStatus, jQxhr ){
            console.log(`data: ${JSON.stringify(data)}`);
            if(data['success'])
            {
                console.log("successful, returning true");
            }
        }
    });
    if(jqXHRResponse['success'] == true)
    {
        return true;
    }
    else return false;
    // console.log("last line of delete");
    // return new Promise((resolve) =>{
    //     $.ajax({
    //         url: 'controller_test.php?type=App&id='+idNum, //This is the current doc
    //         type: "DELETE",
    //         async: false,
    //         dataType: "json",
    //         success: function( data, textStatus, jQxhr ){
    //             console.log("success");
    //             if(data['success'])
    //             {
    //                 resolve(true)
    //             }
    //         }
    //     });
    // })
    // console.log("sending req");
    // $.ajax({
    //     url: 'controller_test.php?type=App&id='+idNum, //This is the current doc
    //     type: "DELETE",
    //     async: false,
    //     dataType: "json",
    //     success: function( data, textStatus, jQxhr ){
    //         console.log("success");
    //         if(data['success'])
    //         {
    //             return true;
    //         }
    //         else return false;
    //     }
    // });
    //ajax call to get app info and update modal
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log(this.responseText);
    //         myObj = JSON.parse(this.responseText);
    //         if(myObj['success'] == false)
    //         {
    //             console.log(myObj['success']);
    //             console.log("returning false");
    //             return false;
    //         }
    //         else
    //         {
    //             console.log(myObj['success']);
    //             console.log("returning true");
    //             return true;
    //         } 
    //     }
    // };
    // xmlhttp.open("DELETE", "../controller/controller_test.php?type=App&id="+idNum);
    // xmlhttp.send();
}

//Gets and returns the requested setting as an object
// can pass:
    //all -> returns all settings:
function getSettings(setting, configObj)
{
    // console.log(`Grabbing settings`);
    var suc = false;
    var jqXHRResponse = $.ajax({
        url: '../controller/controller_test.php?type=setting&setting='+setting, //This is the current doc
        type: "GET",
        async: false,
        dataType: "json",
        success: function( responseData, textStatus, jQxhr ){
            if(!responseData.success == false)
            {
                configObj.settings = responseData.data;
                console.log("successful");
            }
            else
            {
                console.log("Not successful");
            }
        },
        error: function (qXHR, textStatus, errorThrown )
        {
            console.log(`Could not get settings ${textStatus}`);
            return false;
        }
    });
}

function getCourses(configObj)
{
    // console.log(`Grabbing settings`);
    var suc = false;
    var jqXHRResponse = $.ajax({
        url: '../controller/controller_test.php?type=courses', //This is the current doc
        type: "GET",
        async: false,
        dataType: "json",
        success: function( responseData, textStatus, jQxhr ){
            // console.log(`data: ${JSON.stringify(responseData)}`);
            console.log(responseData);
            if(!responseData.success == false)
            {
                console.log("not false");
                configObj.courses = responseData.data;
                
                console.log(configObj.courses);
            }
        }
    });

}

function updatePrice(width, height, price)
{
    console.log("updating");
    // var quantity = $("#Quantity").val();
    if(!(width > 0) || !(height>0))
    {
        console.log("r:0");
        return 0;
    }
    if($('#Units').val() == "CM")
    {
        //convert w/h to feet first
        var feetSquared = (width*0.0328084) * (height *0.0328084);
    }
    else
    {
        //calc from in
        var feetSquared = width * (1/12) * height *(1/12);
    }
    // var cost = (quantity * (feetSquared * price)).toFixed(2);
    var cost = (feetSquared * price).toFixed(2);
    // alert(cost);
    console.log(`returning ${cost}`);
    return cost;

}

//Gets the jobs using batchSize to determine how many to retrieve, and batchNumber to determine what page 
// of jobs to get.
function getJobs(batchSize, batchNumber)
{
    //make ajax call to populate table with data
    var tableBody = document.getElementById("jobTable").getElementsByTagName('tbody')[0];
    var parent = tableBody.parentNode;
    var newBody = document.createElement('tbody');
    newBody.id = 'jobTableBody';
    var jqXHRResponse = $.ajax({
        url: `../controller/controller_test.php?type=jobs&batch=${batchNumber}&size=${batchSize}`,//This is the current doc
        type: "GET",
        async: false,
        dataType: "json",
        success: function( responseData, textStatus, jQxhr ){
            console.log(responseData);
            // myObj = JSON.parse(responseData);
            console.log(responseData.success);
            if(!responseData.success == false)
            {
                myObj = responseData.data;
                for(let x in myObj)
                {
                    var row = newBody.insertRow(0);
                    row.id = `Poster${myObj[x].PosterNo}`;
                    row.classList.add("jobTableRow");
                    // console.log(`adding row ${myObj[x].PosterNo}`);
                    for(let field in myObj[x])
                    {
                        // console.log(field);
                        var cell = row.insertCell();
                        $(cell).addClass(`${field}Cell text-center text-nowrap`);
                        insertHTML =  myObj[x][field];
                        if(field == "PaymentType")
                        {
                            insertHTML = insertHTML == "1"? `<i class="bi bi-speedometer2 text-primary"></i>` : `<i class="bi bi-cash-coin text-dark"></i>`;
                        }
                        cell.innerHTML = insertHTML;
                       
                    }
                    // var currentRow =
                    // console.log(`pickup: ${row.cells['PickUpCell']}`)
                    if($(row).find('.PickUpCell').text() == "Complete")
                    {
                        console.log("pickedup");
                        $(row).addClass("table-success");
                    }
                    if($(row).find('.PickUpCell').text() == "Printed")
                    {
                        console.log("pickedup");
                        $(row).addClass("table-warning");
                    }
                    if($(row).find('.PickUpCell').text() == "Needs Printing")
                    {
                        console.log("pickedup");
                        $(row).addClass("table-danger");
                    }
                }
                // var slides = document.getElementsByClassName("PickUpCell");
                // var pickUpCells = $(".PickUpCell").map(function(){
                //     if(this.text() == "Complete")
                //     {
                //         this.addClass("")
                //     }
                // })

                // row = JSON.parse(this.responseData.data);
            }
            else
            {
                console.log("Not successful");
            }
        }
    });
    parent.removeChild(tableBody);
    parent.appendChild(newBody);
}

async function getDiscount(){
    return new Promise(function(resolve, reject){
        //get the price per sq ft
        var jqXHRResponse = $.ajax({
            url: '../controller/appController_test.php?type=setting&setting=ssscDiscount', //This is the current doc
            type: "GET",
            async: false,
            dataType: "json",
            success: function( responseData, textStatus, jQxhr ){
                // console.log(responseData);
                if(!responseData.success == false)
                {   
                    console.log(`discount: ${responseData.data.ssscDiscount}`);
                    resolve(responseData.data.ssscDiscount);
                }
                else
                {
                    console.log(`${responseData}`);
                    reject("Could not get discount");
                }
            }
        });
    });
}

//get the poster size of the currently displayed application modal
function getFeetSquaredSize()
{
    var height = $("#Height").val();
    var width =$("#Width").val();
    console.log(`pre-adjusted sizes: ${height}-${width}`);
    if($("#Units").val() != "Inch")
    {
        height = cmToInch(height);
        width = cmToInch(width);
    }
    else{
        height = $("#Height").val();
        width = $("#Width").val();
    }
    console.log(`adjusted sizes: ${height}-${width}`);
    return inchToFootSquared(width, height);
}

function cmToInch(cms)
{
    console.log("converting to cms ret: "+cms)
    return cms*0.393701;
}

function inchToFootSquared(width, height)
{
    return ((width*height)/144).toFixed(2);
}


function addNewCourse(courseNum, courseDep, courseYear)
{
    return new Promise((resolve) =>{
        console.log(`Adding course with ${courseNum} ${courseDep} ${courseYear}`);
        var jqXHRResponse = $.ajax({
            url: `../controller/controller_test.php?type=addCourse&courseNumber=${courseNum}&courseDepartment=${courseDep}&courseYear=${courseYear}`, //This is the current doc
            type: "PUT",
            async: false,
            dataType: "json",
            success: function( data, textStatus, jQxhr ){
                console.log(`data: ${JSON.stringify(data)}`);
                if(data['success'])
                {
                    console.log("Added Course!");
                    resolve(true);
                }
                else
                {
                    console.log("Could not add coruse got error: "+data['error'])
                    resolve(false);
                }
            },
            error: function (qXHR, textStatus, errorThrown )
            {
                console.log("could not update database with new course: "+ errorThrown);
                resolve(false);
            }
        });
    })
}

//update state of poster from DB
function setState(id, newState)
{
    return new Promise((resolve) =>{
        console.log(`setting poster ${id} to state ${newState}`);
        var jqXHRResponse = $.ajax({
            url: `../controller/controller_test.php?type=updateState&id=${id}&newState=${newState}`, //This is the current doc
            type: "PUT",
            async: false,
            dataType: "json",
            success: function( data, textStatus, jQxhr ){
                console.log(`data: ${JSON.stringify(data)}`);
                if(data['success'])
                {
                    console.log("Updated state in DB");
                    resolve(true);
                }
                else
                {
                    console.log("Could not update the s tate of the poster: "+data['error'])
                    resolve(false);
                }
            },
            error: function (qXHR, textStatus, errorThrown )
            {
                console.log("could not update state of poster in database"+ errorThrown);
                resolve(false);
            }
        });
    })
    

}

//Hides all state buttons, then enables the passed one
// This is strictly a UI changing function, will not update in the database
// To update the state in the db call the changeState function.
function updatePosterState(currentState)
{
    //current state should be one of:
    // completedPoster -> show receipt button
    // needsPickUp -> printed, sent notification, waiting for pickup
    // printedPoster ->printed, notification not yet sent
    // prePrintPoster -> not yet printed, only show print complete button
    console.log("in state :"+currentState);
    
    //do not show completed buttons
    $(".completedPoster").attr('disabled', true);
    $(".completedPoster").hide();

    $(".needsPickUp").attr('disabled', true);
    $(".needsPickUp").hide();

    $(".printedPoster").attr('disabled', true);
    $(".printedPoster").hide(); 

    //do not show the preprint buttons
    $(".prePrintPoster").attr('disabled', true);
    $(".prePrintPoster").hide(); 

    $(`.${currentState}`).attr('disabled', false); 
    $(`.${currentState}`).show();
}console

function getSDFBalance()
{
    return new Promise(function(resolve, reject){
        //get the price per sq ft
        var jqXHRResponse = $.ajax({
            url: '../controller/Controller_test.php?type=SDFBalance', //This is the current doc
            type: "GET",
            async: false,
            dataType: "json",
            success: function( responseData, textStatus, jQxhr ){
                console.log(`${JSON.stringify(responseData)}`);
                if(responseData.success == true)
                {   
                    console.log(`Balance: ${JSON.stringify(responseData["Balance"])}`);
                    resolve(responseData["Balance"].toFixed(2));
                }
                else
                {
                    console.log(`${JSON.stringify(responseData)}`);
                    reject("Could not get discount");
                }
            }
        });
    });
}


function deleteCourse(e)
{
    
    year = $(e).data('year');
    number = $(e).data('courseno');
    dep = $(e).data('department');
    console.log(`deleteing course with year: ${year} ${number} ${dep}`);
    var jqXHRResponse =  $.ajax({
        url: `../controller/controller_test.php?type=course&courseNo=${number}&department=${dep}&year=${year}`, //This is the current doc
        type: "DELETE",
        async: false,
        dataType: "json",
        success: function( data, textStatus, jQxhr ){
            console.log(`data: ${JSON.stringify(data)}`);
            if(data['success'])
            {
                console.log("successful, returning true");
                $("#collapseOne").trigger("show.bs.collapse");
            }
        },
        error: function (qXHR, textStatus, errorThrown )
        {
            console.log("could not update state of poster in database"+ errorThrown);
        } 
    });
}


function putApplicationOnHold(id)
{
    return new Promise((resolve) =>{
        console.log(`setting Application ${id} to onHold`);
        var jqXHRResponse = $.ajax({
            url: `../controller/controller_test.php?type=putAppOnHold&id=${id}`, //This is the current doc
            type: "PUT",
            async: false,
            dataType: "json",
            success: function( data, textStatus, jQxhr ){
                console.log(`data: ${JSON.stringify(data)}`);
                if(data['success'])
                {
                    console.log("Updated state in DB");
                    resolve(true);
                }
                else
                {
                    console.log("Could not update the state of the app: "+data['error'])
                    resolve(false);
                }
            },
            error: function (qXHR, textStatus, errorThrown )
            {
                console.log("could not update state of the app eror:"+ errorThrown);
                resolve(false);
            }
        });
    })
}


function addReceiptInfo(PosterNo)
{
    return new Promise((resolve) =>{
        console.log(`Getting receipt info for ${PosterNo}`);
        var jqXHRResponse = $.ajax({
            url: `../controller/controller_test.php?type=receiptInfo&posterNo=${PosterNo}`, //This is the current doc
            type: "GET",
            async: false,
            dataType: "json",
            success: function( data, textStatus, jQxhr ){
                // console.log(`data: ${JSON.stringify(data)}`);
                if(data['success'])
                {
                    console.log("Got Receipt info!");
                    // console.log(JSON.stringify(data['data']));
                    info = data['data'];
                    if(info['PaymentType'] == 'Cash')
                    {   
                        console.log("cash reciept type");
                        $(".CashRecieptOptions").show();
                        $(".SpeedCodeReceiptOptions").hide();
                    }
                    else
                    {
                        $(".CashRecieptOptions").hide();
                        $(".SpeedCodeReceiptOptions").show();
                    }
                    for(let x in info)
                    {
                        // console.log("setting "+x);
                        $(`#receipt${x}`).val(info[`${x}`]).change();
                    }
                    
                    $("#receiptTotal").val(parseFloat($("#receiptTotal").val()).toFixed(2))
                    $("#receiptDiscount").val(parseFloat($("#receiptDiscount").val()).toFixed(2))
                    $("#receiptCost1").val(parseFloat($("#receiptCost1").val()).toFixed(2))
                    $("#receiptDescription1").val(`Poster ${$("#receiptDescription1").val()}`);
                    if(!$("#receiptReceivedSum").val())
                    {
                        //filling in recieved sum
                        console.log("Filling in receipt recieved sum");
                        $("#receiptReceivedSum").val(parseFloat($("#receiptTotal").val()).toFixed(2));
                    }

                    resolve(true);
                }
                else
                {
                    console.log("Could not Get Receipt info!: "+data['error'])
                    resolve(false);
                }
            },
            error: function (qXHR, textStatus, errorThrown )
            {
                console.log("could not Get Receipt info!:"+ errorThrown);
                resolve(false);
            }
        });
    })
}

function resetAppModal()
{
    $("#addJob").hide();
    $("#acceptJobWarning").hide();
    $(".addJobField").attr('disabled', true);
    $("#approveBtn").show();
    $("#modalSubmitBtn").prop("hidden", false);
    $("#ApprovePoster").text("Accept Job");
    // $("#addJob").collapse('hide');
}


function updateSDFBalance(type, amount)
{
    //pass through to controller. 
    return new Promise(function(resolve, reject){
        //get the price per sq ft
        var jqXHRResponse = $.ajax({
            url: `../controller/controller_test.php?type=${type}&amount=${amount}`, 
            type: "PUT",
            async: false,
            dataType: "json",
            success: function( responseData, textStatus, jQxhr ){
                // console.log(responseData);
                if(!responseData.success == false)
                {   
                    console.log(`Updated SDF balance successfully`);
                    resolve(true);
                }
                else
                {
                    console.log(`${responseData}`);
                    reject("Could not get discount");
                }
            }
        });
    });
}

function emailReceipt(toEmail, JsonReceiptData)
{
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `../controller/controller_test.php?type=emailPDF&email=${emailTo}`, //Inform that controller should insert data to 
            type: "POST",
            // dataType:"json", //add json datatype to get json
            data: JsonReceiptData,
            dataType: "json",
            success: function( responseData, textStatus, jQxhr ){
                console.log(`responseData: ${JSON.stringify(responseData)}`);
                console.log(`success: ${responseData['success']}`);
                showToastSuccess("Email Sent", "Success", `Receipt sent to ${toEmail}`);
                resolve(true)
            },
            error: function(jqXHR, status, errorThrown){
                console.log(`ajax error ${errorThrown} status: ${status}`);
                showToastFailure("Email Error", "Error", `Could not send email to ${toEmail}`);
                reject(false)
            }
        }); 
    })
}

function showToastSuccess(headerText, smallHeaderText, bodyText)
{
    const toast = new bootstrap.Toast($("#liveToast"));
    $("#liveToastHead").text(headerText);
    $("#liveToastHead").addClass("text-secondary");
    $("#liveToastHead").removeClass("text-danger");
    $("#liveToastSmall").text(smallHeaderText);
    $("#liveToastBody").html(bodyText);
    toast.show()
}

function showToastFailure(headerText, smallHeaderText, bodyText)
{
    const toast = new bootstrap.Toast($("#liveToast"));
    $("#liveToastHead").text(headerText);
    $("#liveToastHead").addClass("text-danger");
    $("#liveToastHead").removeClass("text-secondary");
    $("#liveToastSmall").text(smallHeaderText);
    $("#liveToastBody").html(bodyText);
    toast.show()
}
