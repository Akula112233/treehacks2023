import math
import openai # pip install --upgrade openai

model = "text-davinci-003"
temperature = 0.1 # want accurate + deterministic, add slight creativity
openai.api_key = "***INSERT OPEN AI KEY***"

def make_call(prompt, num_tokens=1000):
    response = openai.Completion.create(model=model, prompt=prompt, temperature=temperature, max_tokens=num_tokens)['choices'][0]['text']
    return response

def simplify(text, article):
    text_file = open("prompts_simplify.txt", "r")
    base_prompt = text_file.read()
    prompt = base_prompt + text + "\n\nSimplified Version:\n"
    print(prompt)
    return make_call(prompt)

def simplify_all(article):
    prompt = article + "\Explain the content from the above article in simple terms\n"
    return make_call(prompt)

def summarize(text, article):
    text_file = open("prompts_simplify.txt", "r")
    base_prompt = text_file.read()
    prompt = base_prompt + text + "\n\nSummarized Version:\n"
    return make_call(prompt)


def summarize_all(article):
    prompt = article + "\nSummarize the content from the above article\n"
    return make_call(prompt)

def q_a(question, article):
    prompt = article + "\nGiven the above article, " + question + "\n"
    return make_call(prompt)


def computeTF(word, words):
    return float(words.count(word)) / float(len(words))

def computeIDF(word, words):
    return math.log(1.0/computeTF(word, words))

def match(word, response, article, threshold): # iterate through words and highlight word if match > threshold
    tf_idf = computeTF(word, response) * (word, article)
    return tf_idf >= threshold
