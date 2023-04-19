const axios = require("axios");

const CREATE_SOURCE_ROUTE = "payment_sources";
const CREATE_TRANSACTION_ROUTE = "transactions";
const GET_ACCEPTANCE_TOKEN_ROUTE = "merchants";
const PRIVATE_HEADERS = {
  headers: {
    Authorization: `Bearer ${process.env.WACE_PRIVATE_KEY}`,
    "Content-Type": "application/json",
  },
};
const createPaymentSource = async (sourceData) => {
  const body = mapSourceData(sourceData);
  try {
    const { status, data } = await axios.post(
      `${process.env.WACE_API}/${CREATE_SOURCE_ROUTE}`,
      body,
      PRIVATE_HEADERS
    );
    console.log({ status, data: data?.data });
    return { status, data: data?.data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
};

const getAcceptanceToken = async () => {
  const response = await axios.get(
    `${process.env.WACE_API}/${GET_ACCEPTANCE_TOKEN_ROUTE}/${process.env.WACE_PUBLIC_KEY}`
  );
  return response?.data?.data?.presigned_acceptance;
};

const createTransaction = async (transactionData) => {
  return await fetch(
    `${process.env.WACE_API}/${CREATE_TRANSACTION_ROUTE}`,
    mapTransaction(transactionData)
  );
};

const mapSourceData = (sourceData) => {
  return {
    type: sourceData.type,
    token: sourceData.token,
    customer_email: sourceData.customerEmail,
    acceptance_token: sourceData.acceptanceToken,
  };
};
const mapTransaction = (transactionData) => {
  return {
    amount_in_cents: 4990000, // Monto current centavos
    currency: "COP", // Moneda
    customer_email: "example@gmail.com", // Email del usuario
    payment_method: {
      installments: 2, // Número de cuotas si la fuente de pago representa una tarjeta de lo contrario el campo payment_method puede ser ignorado.
    },
    reference: "sJK4489dDjkd390ds02", // Referencia única de pago
    payment_source_id: 3891, // ID de la fuente de pago
  };
};

module.exports = {
  createPaymentSource,
  getAcceptanceToken,
  createTransaction,
};
