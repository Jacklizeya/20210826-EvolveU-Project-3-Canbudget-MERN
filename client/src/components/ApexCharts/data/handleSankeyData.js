export default function handleSankeyData(transactions, incomes) {

  let sankeyDataArray = [['From','To','Weight']]

  let sankeyIncomesArray = []
  for (let source in incomes) {
    sankeyIncomesArray.push([incomes[source].name, 'income', Number(incomes[source].amount)])
  }

  let sankeyPaymentsArray = []
  let sankeyFirstNodeArray = []
  let sankeySecondNodeArray = []
  let sankeyThirdNodeArray = []

  for (let i in transactions) {
    let transactionCategories = transactions[i].category.split(", ")
    if (transactionCategories[0] === ('Transfer' || 'Payment')) {
      sankeyPaymentsArray.push(transactions[i])
    } else {
      if (transactions[i].amount < 0) {
        let trasactionAmount = transactions[i].amount*-1
        sankeyFirstNodeArray.push(['income', transactionCategories[0], Number(trasactionAmount)])
        if (transactionCategories[1]) {
          sankeySecondNodeArray.push([transactionCategories[0], transactionCategories[1], Number(trasactionAmount)])
        }
        if (transactionCategories[2]) {
          sankeyThirdNodeArray.push([transactionCategories[1], transactionCategories[2], Number(trasactionAmount)])
        }
      }
    }
  }

  console.log(sankeyFirstNodeArray, sankeySecondNodeArray, sankeyThirdNodeArray)

  for (let i in sankeyIncomesArray) {
    sankeyDataArray.push(sankeyIncomesArray[i])
  }

  for (let i in sankeyFirstNodeArray) {
    sankeyDataArray.push(sankeyFirstNodeArray[i])
  }

  for (let i in sankeySecondNodeArray) {
    sankeyDataArray.push(sankeySecondNodeArray[i])
  }

  for (let i in sankeyThirdNodeArray) {
    sankeyDataArray.push(sankeyThirdNodeArray[i])
  }
  
  return sankeyDataArray
}

  // let transactionArray = []
  // let parentNodes = []
  // for (let i in transactions) {
  //   let transactionCategories = transactions[i].category.split(", ")
  //   parentNodes.push(transactionCategories[0])
  //   let transactionObject = {
  //     firstNode: transactionCategories[0] ? transactionCategories[0] : null,
  //     secondNode: transactionCategories[1] ? transactionCategories[1] : null,
  //     thirdNode: transactionCategories[2] ? transactionCategories[2] : null,
  //     amount: transactions[i].amount
  //   }
  //   transactionArray.push(transactionObject)
  // }
  // parentNodes = [...new Set(parentNodes)]
  // let newParentNodes = []
  // for (let parent in parentNodes) {
  //   let parentArray = []
  //   for (let i in transactionArray) {
  //     if (parentNodes[parent] === transactionArray[i].firstNode) {
  //       parentArray.push(transactionArray[i])
  //     }
  //   }
  //   newParentNodes[parentNodes[parent]] = parentArray
  // }
  // parentNodes = newParentNodes
  // let sankeyTransactionsArray = [['From', 'To', 'Weight']]
  // for (let parent in parentNodes) {
  //   for (let i in parentNodes[parent]) {
  //     if ((parentNodes[parent][i].firstNode !== 'Transfer') && (parentNodes[parent][i].firstNode !== 'Payment') & (parentNodes[parent][i].amount < 0)) {
  //       sankeyTransactionsArray.push([parentNodes[parent][i].firstNode, parentNodes[parent][i].secondNode, parentNodes[parent][i].amount * -1])
  //     }
  //   }
  // }