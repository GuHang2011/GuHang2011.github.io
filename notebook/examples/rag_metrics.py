"""Toy retrieval metrics. No model or network access is needed."""
def recall_at_k(ranked, relevant, k):
    if k < 1:
        raise ValueError("k must be positive")
    relevant = set(relevant)
    if not relevant:
        return None  # Unanswerable queries need a separate abstention measure.
    # Remove duplicate document IDs before applying the retrieval budget.
    retrieved = set(list(dict.fromkeys(ranked))[:k])
    return len(retrieved & relevant) / len(relevant)

def reciprocal_rank(ranked, relevant):
    relevant = set(relevant)
    for rank, doc in enumerate(dict.fromkeys(ranked), start=1):
        if doc in relevant:
            return 1 / rank
    return 0.0

if __name__ == "__main__":
    ranked = ["policy-old", "guide", "guide", "policy-current"]
    gold = {"guide", "policy-current"}
    print("Recall@2:", recall_at_k(ranked, gold, 2))  # 0.5
    print("Reciprocal rank:", reciprocal_rank(ranked, gold))  # 0.5
