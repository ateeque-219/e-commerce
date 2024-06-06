import React from 'react';
import Layout from './../components/Layout/Layout.js';
import '../styles/Policy.css'; // Import your CSS file

const Policy = () => {
  return (
    <div>
      <Layout>
        <div className="row policy">
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              // style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4 policy-content">
            <h2>Privacy Policy</h2>
            <p>Add privacy policy</p>
            <p>Add privacy policy</p>
            <p>Add privacy policy</p>
            
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Policy;
