import React from "react";

function Register() {
    return (
        <section class="vh-100">
          <div class="container py-5 h-100">
                <div class="row d-flex align-items-center justify-content-center h-100">
                    
                    
              <div class="col-md-8 col-lg-7 col-xl-6">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  class="img-fluid" alt="Phonemage"/>
              </div>
              <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <form>
                        <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input type="text" id="form3Example1" class="form-control" />
                      <label class="form-label" for="form3Example1">First name</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input type="text" id="form3Example2" class="form-control" />
                      <label class="form-label" for="form3Example2">Last name</label>
                    </div>
                  </div>
                </div>
                  <div class="form-outline mb-4">
                    <input type="email" id="form1Example13" class="form-control form-control-lg" />
                    <label class="form-label" for="form1Example13">Email address</label>
                  </div>
        
                  <div class="form-outline mb-4">
                    <input type="password" id="form1Example23" class="form-control form-control-lg" />
                    <label class="form-label" for="form1Example23">Password</label>
                  </div>
        
                  <button type="submit" class="btn btn-primary btn-lg btn-block">Sign in</button>
                </form>
              </div>
            </div>
          </div>
        </section>
        );
}

export default Register;
