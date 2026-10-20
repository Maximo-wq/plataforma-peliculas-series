
const testDB = db.getSiblingDB("prueba_transacciones");

// Crear las colecciones antes de iniciar las transacciones.
if (!testDB.getCollectionNames().includes("cuentas")) {
  testDB.createCollection("cuentas");
}
if (!testDB.getCollectionNames().includes("movimientos")) {
  testDB.createCollection("movimientos");
}

// Preparar datos exclusivos para esta prueba.
testDB.cuentas.replaceOne(
  { _id: "A" },
  { _id: "A", saldo: 1000 },
  { upsert: true }
);
testDB.cuentas.replaceOne(
  { _id: "B" },
  { _id: "B", saldo: 500 },
  { upsert: true }
);
testDB.movimientos.deleteMany({});

const session = db.getMongo().startSession();
const txDB = session.getDatabase("prueba_transacciones");

try {
  // CASO 1: TRANSACCIÓN EXITOSA
  session.startTransaction();

  txDB.cuentas.updateOne(
    { _id: "A" },
    { $inc: { saldo: -100 } }
  );
  txDB.cuentas.updateOne(
    { _id: "B" },
    { $inc: { saldo: 100 } }
  );
  txDB.movimientos.insertOne({
    tipo: "transferencia",
    importe: 100,
    resultado: "confirmada",
    fecha: new Date()
  });

  session.commitTransaction();
  print("ÉXITO: transacción confirmada con commitTransaction().");

  print("Saldos después del commit:");
  printjson(testDB.cuentas.find().toArray());

  // CASO 2: FALLO SIMULADO Y ROLLBACK
  session.startTransaction();

  txDB.cuentas.updateOne(
    { _id: "A" },
    { $inc: { saldo: -500 } }
  );
  txDB.cuentas.updateOne(
    { _id: "B" },
    { $inc: { saldo: 500 } }
  );

  // Provocamos un error antes del commit para demostrar el rollback.
  throw new Error("Fallo simulado durante la transferencia.");

} catch (error) {
  try {
    session.abortTransaction();
    print("ROLLBACK: transacción cancelada con abortTransaction().");
  } catch (abortError) {
    print("Error al abortar: " + abortError.message);
  }

  print("Motivo: " + error.message);
} finally {
  session.endSession();
}
// Comprobar que el segundo intento no cambió los saldos.
print("Saldos finales después del rollback:");
printjson(testDB.cuentas.find().toArray());

print("Movimientos confirmados:");
printjson(testDB.movimientos.find().toArray());
