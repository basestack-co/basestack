"use client";

import React, { Fragment } from "react";
import { Form } from "components";
import { useTranslations } from "next-intl";

const ContactPage = () => {
  const t = useTranslations();

  return (
    <Fragment>
      <Form
        header={{
          caption: "Basestack Platform",
          title: "Contact Basestack",
          text: "Contact us for more information you will not regret it, Contact us for more information you will not regret it",
        }}
      />
    </Fragment>
  );
};

export default ContactPage;
