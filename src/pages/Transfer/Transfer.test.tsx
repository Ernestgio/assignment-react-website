import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Transfer from "./Transfer";

import { store } from "../../store";

test("Should page transfer page with Header exists", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Transfer />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );

  const transferHeader = screen.getByTestId("transfer-header");
  expect(transferHeader).toBeInTheDocument();
});

test("Should match snapshot", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Transfer />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );

  const transferHeader = screen.getByTestId("transfer-header");
  expect(screen).toMatchSnapshot();
});

test("Source Wallet Input form should have disabled class", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Transfer />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );

  const fromInput = screen.getByTestId("from-input");
  expect(fromInput.classList.contains("disabled")).toBe(true);
});

test("Should display amount empty warning on first time page loads", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Transfer />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
  const amountEmptyWarning = screen.getByTestId("amount-empty-warning");
  expect(amountEmptyWarning).toBeInTheDocument();
});

test("Should display amount too little warning when amount only 5000", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Transfer />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );

  fireEvent.click(screen.getByTestId("amount-input"));
  fireEvent.change(screen.getByTestId("amount-input"), {
    target: { value: "5000" },
  });

  const amountInputWarning = screen.getByTestId("amount-value-warning");
  expect(amountInputWarning).toBeInTheDocument();
});

test("Should display warning when input is having higher amount than balance", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Transfer />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );

  fireEvent.click(screen.getByTestId("amount-input"));
  fireEvent.change(screen.getByTestId("amount-input"), {
    target: { value: "10000" },
  });

  const insufficientBalanceWarning = screen.getByTestId(
    "insufficient-balance-warning"
  );
  expect(insufficientBalanceWarning).toBeInTheDocument();
});
