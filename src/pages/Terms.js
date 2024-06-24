import React from "react";
import "../styles/TermsOfService.css";

const TermsOfService = () => {
  const date = new Date().getDate();
  return (
    <div className="terms-container">
      <h1>Terms of Service</h1>
      {/* <p>Last updated: [{date}]</p> */}

      <h2>1. Introduction</h2>
      <p>
        Welcome to Slyder. By using our app, you agree to these Terms of
        Service. Please read them carefully.
      </p>

      <h2>2. User Accounts</h2>
      <p>
        To use our app, you must create an account. You are responsible for
        maintaining the confidentiality of your account information and for all
        activities that occur under your account.
      </p>

      <h2>3. User Content</h2>
      <p>
        You retain ownership of the content you post on our app. However, by
        posting content, you grant us a non-exclusive, royalty-free, worldwide
        license to use, display, and distribute your content.
      </p>

      <h2>4. Prohibited Activities</h2>
      <p>
        You agree not to engage in any of the following prohibited activities:
      </p>
      <ul>
        <li>Posting harmful or illegal content</li>
        <li>Harassing or abusing other users</li>
        <li>Using the app for any unlawful purpose</li>
        <li>Attempting to hack or disrupt the app</li>
      </ul>

      <h2>5. Termination</h2>
      <p>
        We reserve the right to terminate or suspend your account at any time,
        without notice, for conduct that we believe violates these Terms of
        Service or is harmful to other users of the app.
      </p>

      <h2>6. Changes to Terms</h2>
      <p>
        We may update these Terms of Service from time to time. We will notify
        you of any changes by posting the new Terms of Service on this page.
      </p>

      {/* <h2>7. Contact Us</h2> */}
      {/* <p>
        If you have any questions about these Terms of Service, please contact
        us at [Your Contact Information].
      </p> */}
    </div>
  );
};

export default TermsOfService;
