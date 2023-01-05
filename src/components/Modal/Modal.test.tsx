import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

test("Should render modal as a transfer component", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Modal
              context=""
              show={true}
              to={0}
              from={0}
              description={""}
              amount={0}
              id={0}
              onClose={() => {}}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );

  const transferHeader = screen.getByText("Success");
  expect(transferHeader).toBeInTheDocument();
});

test("Should call window print when print button pressed", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Modal
              context=""
              show={true}
              to={0}
              from={0}
              description={""}
              amount={0}
              id={0}
              onClose={() => {}}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
  jest.spyOn(window, "print").mockReturnValue();
  const printButton = screen.getByTestId("print-button");
  fireEvent.click(printButton);
  expect(window.print).toHaveBeenCalled();
});
