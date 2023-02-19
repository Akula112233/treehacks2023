import math
import openai  # pip install --upgrade openai

model = "text-davinci-003"
temperature = 0.1  # want accurate + deterministic, add slight creativity
openai.api_key = "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"


def make_call(prompt, num_tokens=1000):
    response = \
    openai.Completion.create(model=model, prompt=prompt, temperature=temperature, max_tokens=num_tokens)['choices'][0][
        'text']
    return response


def simplify(text, article):
    prompt = article + "\nExplain the following excerpt from the article above in middle school terms, but only including the ideas listed after here: " + text + "\n"
    return make_call(prompt)


def simplify_all(article):
    prompt = article + "\Explain the content from the above article in middle school terms\n"
    return make_call(prompt)


def summarize(text, article):
    prompt = article + "\nSummarize this using the above information succinctly: " + text + "\n"
    return make_call(prompt)


def summarize_all(article):
    prompt = article + "\nSummarize the content from the above article, succinctly\n"
    return make_call(prompt)


def q_a(question, article):
    prompt = article + "\nGiven the above article, " + question + "\n"
    return make_call(prompt)


def computeTF(word, words):
    returnVal = float(words.count(word)) / float(len(words))
    return returnVal


def computeIDF(word, words):
    tfVal = computeTF(word, words)
    if tfVal == 0:
        return 0
    returnVal = math.log(1.0 / tfVal)
    return returnVal


def match(word, response, article, threshold):  # iterate through words and highlight word if match > threshold
    tf_idf = computeTF(word, response) * computeIDF(word, article)
    return tf_idf >= threshold
