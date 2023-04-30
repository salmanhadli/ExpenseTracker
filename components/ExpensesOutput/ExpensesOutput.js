import { StyleSheet, Text, View } from "react-native";
import ExpenseSummary from "./ExpenseSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

export default ({ expenses, periodName, fallbackText }) => {
  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} periodName={periodName} />
      {expenses.length ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.infoText}> {fallbackText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
