// import { Link } from '@inertiajs/react';

export default function Primary({ children }) {
    return (     
        <div>
            <nav class="navbar bg-light fixed-top">
                {/* <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <a class="navbar-brand" href="#" style="text-align: center;">
                                <img alt="Western University Social Science Logo" class="stacked-logo-two" src="https://www.uwo.ca/web_standards/img/logos-faculties-stacked/svg/Western_Logo_F_S_SocialScience_RGB.svg" style="width: 220px; margin-top: 10px;"/>
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
                </div> */}
            </nav>
            <div >
                {children}
            </div>
        </div>
    );
}