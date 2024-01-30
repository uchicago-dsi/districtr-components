
import React from "react";
import UnitController from "./UnitController";

export default {
    title: "UnitController"
};

export const WithBar = () => <UnitController foo="bar" />;

export const WithBaz = () => <UnitController foo="baz" />;
