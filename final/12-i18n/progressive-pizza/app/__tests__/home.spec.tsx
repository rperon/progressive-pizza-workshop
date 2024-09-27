import { createRemixStub } from "@remix-run/testing";
import { default as Component, action } from "~/routes/_index";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import * as i18n from "../i18n";

const App = createRemixStub([
  {
    path: "/",
    Component,
    action,
  },
  {
    path: "/confirmation",
    Component() {
      return <h1>Confirmation</h1>;
    },
  },
]);

test("rendering the order page", async () => {
  render(<App initialEntries={["/"]} initialIndex={0} />, {
    wrapper: ({ children }) => {
      i18next.use(initReactI18next).init({ ...i18n });
      return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
    },
  });

  expect(await screen.findByText("Remix your pizza")).toBeInTheDocument();
});

test("ordering a pizza", async () => {
  render(<App initialEntries={["/"]} initialIndex={0} />);
  const user = userEvent.setup();

  const mediumPizzaRadio = await screen.findByRole("radio", {
    name: /medium/i,
  });
  await user.click(mediumPizzaRadio);

  const orderButtons = await screen.findAllByRole("button");
  await user.click(orderButtons[0]);

  expect(await screen.findByText("Confirmation")).toBeInTheDocument();
});
