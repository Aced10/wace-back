// Model Payment Source
const paymentSource = require("../models/payment.source");

// Dummy Data
const { tokensPaymentMethods } = require("../data/dummyData");

// Wace Integration function
const {
  createPaymentSource,
  getAcceptanceToken,
  createTransaction,
} = require("./waceEntity");

const newPaymentSource = async (sourceData) => {
  const { customerId, customerEmail, acceptanceToken, type, token } =
    sourceData;
  if (!customerId || !customerEmail || !acceptanceToken || !type || !token)
    return {
      status: 400,
      message: "Todos los campos del metodo de pago son requeridos",
    };
  const { data, status } = await createPaymentSource({
    type,
    token,
    customerEmail,
    acceptanceToken,
  });
  if (status !== 201) return { status, data };
  try {
    const newPaymentSource = await paymentSource.create({
      customerId,
      type,
      token,
      customerEmail,
      paymentSourceWomId: data?.id,
      status: data?.status,
      lastFour: data?.public_data?.last_four,
      phoneNumber: data?.public_data?.phone_number,
    });
    return {
      status: 200,
      message: "Metodo de pago creado exitosamente!",
      data: newPaymentSource,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Se presento un error al crear el metodo de pago!",
      data: error,
    };
  }
};

const findPaymentMethod = async (paymentSourceId) => {
  if (!paymentSourceId)
    return { status: 400, message: "El ID del metodo de pago es requerido!" };
  try {
    const costumer = await paymentSource.findById(paymentSourceId);
    return {
      status: 200,
      message: "Se encontro el metodo de pago de manera exitosa!",
      data: costumer,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Se presento un error al buscar el metodo de pago!",
      data: error,
    };
  }
};

const acceptanceTokenWace = async () => {
  try {
    const acceptanceToken = await getAcceptanceToken();
    return {
      status: 200,
      message: "Se obtuvo el token de aceptaciòn de manera exitosa!",
      data: acceptanceToken,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Ocurrio un error en la solicitud del token de aceptaciòn!",
      data: error,
    };
  }
};
function getPaymentToken() {
  const index = Math.floor(Math.random() * tokensPaymentMethods.length);
  return tokensPaymentMethods[index];
}

module.exports = {
  findPaymentMethod,
  newPaymentSource,
  acceptanceTokenWace,
};
