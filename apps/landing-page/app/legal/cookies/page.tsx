"use client";

import React from "react";
import Link from "next/link";
// Styles
import LegalGlobalStyle from "styles/legalGlobalStyles";
import styled from "styled-components";

const Container = styled.section`
  padding: ${({ theme }) => theme.spacing.s8} ${({ theme }) => theme.spacing.s5};
`;

const CookiesPolicyPage = () => {
  return (
    <>
      <LegalGlobalStyle />
      <Container>
        <div>
          <Link href="/legal/privacy">Go back</Link>
          <h2>Basestack Cookie Policy</h2>
          <p>
            We use cookies to help improve your experience of our website at{" "}
            <a href="https://www.basestack.co" target="_blank" rel="noreferrer">
              https://www.basestack.co
            </a>
            . This cookie policy is part of Basestack&#39;s privacy policy. It
            covers the use of cookies between your device and our site.
          </p>
          <p>
            We also provide basic information on third-party services we may
            use, who may also use cookies as part of their service. This policy
            does not cover their cookies.
          </p>
          <p>
            If you don’t wish to accept cookies from us, you should instruct
            your browser to refuse cookies from{" "}
            <a href="https://www.basestack.co" target="_blank" rel="noreferrer">
              https://www.basestack.co
            </a>
            . In such a case, we may be unable to provide you with some of your
            desired content and services.
          </p>
          <h3>What is a cookie?</h3>
          <p>
            A cookie is a small piece of data that a website stores on your
            device when you visit. It typically contains information about the
            website itself, a unique identifier that allows the site to
            recognize your web browser when you return, additional data that
            serves the cookie’s purpose, and the lifespan of the cookie itself.
          </p>
          <p>
            Cookies are used to enable certain features (e.g. logging in), track
            site usage (e.g. analytics), store your user settings (e.g. time
            zone, notification preferences), and to personalize your content
            (e.g. advertising, language).
          </p>
          <p>
            Cookies set by the website you are visiting are usually referred to
            as first-party cookies. They typically only track your activity on
            that particular site.
          </p>
          <p>
            Cookies set by other sites and companies (i.e. third parties) are
            called third-party cookies They can be used to track you on other
            websites that use the same third-party service.
          </p>
          <h3>Types of cookies and how we use them</h3>
          <h4>Essential cookies</h4>
          <p>
            Essential cookies are crucial to your experience of a website,
            enabling core features like user logins, account management,
            shopping carts, and payment processing.
          </p>
          <p>We do not use this type of cookie on our site. </p>
          <h4>Performance cookies</h4>
          <p>
            Performance cookies track how you use a website during your visit.
            Typically, this information is anonymous and aggregated, with
            information tracked across all site users. They help companies
            understand visitor usage patterns, identify and diagnose problems or
            errors their users may encounter, and make better strategic
            decisions in improving their audience’s overall website experience.
            These cookies may be set by the website you’re visiting
            (first-party) or by third-party services. They do not collect
            personal information about you.
          </p>
          <p>We use performance cookies on our site. </p>
          <h4>Functionality cookies</h4>
          <p>
            Functionality cookies are used to collect information about your
            device and any settings you may configure on the website you’re
            visiting (like language and time zone settings). With this
            information, websites can provide you with customized, enhanced, or
            optimized content and services. These cookies may be set by the
            website you’re visiting (first-party) or by third-party services.
          </p>
          <p>We use functionality cookies for selected features on our site.</p>
          <h4>Targeting/advertising cookies</h4>
          <p>
            Targeting/advertising cookies help determine what promotional
            content is most relevant and appropriate to you and your interests.
            Websites may use them to deliver targeted advertising or limit the
            number of times you see an advertisement. This helps companies
            improve the effectiveness of their campaigns and the quality of
            content presented to you. These cookies may be set by the website
            you’re visiting (first-party) or by third-party services.
            Targeting/advertising cookies set by third-parties may be used to
            track you on other websites that use the same third-party service.
          </p>
          <p>We do not use this type of cookie on our site. </p>
        </div>
      </Container>
    </>
  );
};

export default CookiesPolicyPage;
