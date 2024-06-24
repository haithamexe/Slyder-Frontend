import React from "react";
import "../styles/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      {/* <p>Last updated: [Date]</p> */}

      <h2>1. Introduction</h2>
      <p>
        Welcome to Slyder. We are committed to protecting your privacy. This
        Privacy Policy explains how we collect, use, and share your personal
        information.
      </p>

      <h2>2. Information We Collect</h2>
      <p>We collect the following types of information:</p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Information that can be used to
          identify you, such as your name, email address, and profile picture.
        </li>
        <li>
          <strong>Usage Data:</strong> Information about how you use our app,
          such as the pages you visit and the actions you take.
        </li>
        <li>
          <strong>Device Information:</strong> Information about the device you
          use to access our app, such as your IP address, browser type, and
          operating system.
        </li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use your information for the following purposes:</p>
      <ul>
        <li>To provide and maintain our app</li>
        <li>To personalize your experience</li>
        <li>To communicate with you</li>
        <li>To analyze usage and improve our app</li>
        <li>To protect the security and integrity of our app</li>
      </ul>

      <h2>4. Sharing Your Information</h2>
      <p>
        We may share your information with third parties in the following
        circumstances:
      </p>
      <ul>
        <li>With your consent</li>
        <li>To comply with legal obligations</li>
        <li>To protect and defend our rights and property</li>
        <li>With service providers who assist us in operating our app</li>
      </ul>

      <h2>5. Security</h2>
      <p>
        We take reasonable measures to protect your information from
        unauthorized access, use, or disclosure. However, no method of
        transmission over the internet or method of electronic storage is
        completely secure.
      </p>

      <h2>6. Your Rights</h2>
      <p>You have the following rights regarding your personal information:</p>
      <ul>
        <li>The right to access your information</li>
        <li>The right to correct your information</li>
        <li>The right to delete your information</li>
        <li>
          The right to object to or restrict the processing of your information
        </li>
        <li>The right to data portability</li>
      </ul>

      <h2>7. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page.
      </p>

      {/* <h2>8. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at [Your Contact Information].
      </p> */}
    </div>
  );
};

export default PrivacyPolicy;
