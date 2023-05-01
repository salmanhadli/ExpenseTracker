import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

export default ({ onCancel, onSubmit, submitButtonLabel, initalValues }) => {
  //   const [amount, setAmount] = useState("");
  //   const [date, setDate] = useState("");
  //   const [description, setDescription] = useState("");
  //   function amountChangeHandler(amount) {
  //     setAmount(amount);
  //   }
  //   function dateChangeHandler(date) {
  //     setDate(date);
  //   }
  //   function descriptionChangeHandler(description) {
  //     setDescription(description);
  //   }

  const [inputs, setInputs] = useState({
    amount: {
      value: initalValues ? initalValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: initalValues ? getFormattedDate(initalValues.date) : "",
      isValid: true,
    },
    description: {
      value: initalValues ? initalValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, value) {
    setInputs((prevState) => ({
      ...prevState,
      [inputIdentifier]: { value, isValid: true },
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value.trim(),
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionisValid = expenseData.description.trim().length > 0;
    if (amountIsValid && dateIsValid && descriptionisValid)
      onSubmit(expenseData);
    else {
      //   Alert.alert("Invalid input", "Please check your input values");
      setInputs((state) => ({
        amount: {
          value: state.amount.value,
          isValid: amountIsValid,
        },
        date: {
          value: state.date.value,
          isValid: dateIsValid,
        },
        description: {
          value: state.description.value,
          isValid: descriptionisValid,
        },
      }));
    }
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <>
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Your Expense
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Input
            label="Amount"
            inValid={!inputs.amount.isValid}
            inputStyles={{
              flex: 1,
            }}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangeHandler.bind(this, "amount"),
              value: inputs.amount.value,
            }}
          />
          <Input
            label="Date"
            inValid={!inputs.date.isValid}
            inputStyles={{
              flex: 1,
            }}
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: inputChangeHandler.bind(this, "date"),
              value: inputs.date.value,
            }}
          />
        </View>
        <Input
          label="Description"
          inValid={!inputs.description.isValid}
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, "description"),
            value: inputs.description.value,
            //   textAlignVertical: "top",
            //   autoCapitalize: "sentences",
          }}
        />
        {formIsInvalid && (
          <Text style={styles.errorText}>
            Invalid input values. Please check your data
          </Text>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
