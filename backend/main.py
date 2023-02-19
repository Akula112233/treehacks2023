# ----------------------------------------------------------------------------#
# Imports
# ----------------------------------------------------------------------------#

from flask import Flask, request
from flask_cors import CORS
from readability import Document
from bs4 import BeautifulSoup
import os

app = Flask(__name__)
CORS(app)

@app.route('/send_text', methods=['POST'])
def action_router():
    data = request.json

    # Making sure data format is correct here
    try:
        highlighted = data['highlighted'],  # Empty if you want full article, ignored if you send type 'qanda'
        context = data['context'],  # Empty if you don't have anything stored in cookies
        raw_website = data['raw_website'],  # Always need to send this, but it will be ignored if context isn't empty
        reqType = data['typed'],  # Send me either 'summarize' or 'simplify' or 'qanda'
        question = data['question']  # This will be blank/ignored, unless type is 'qanda'
    except:
        return 'Error, please send the data in correct format (make sure all vars are specified)'

    # Initialize the context of the article
    if context == '':
        article = scrape_text(raw_website)
        context = load_article(article)

    if reqType == 'summarize' and highlighted == '':
        response, context = summarize_full(context)
    # elif reqType == 'summarize' and highlighted != '':
    #     response, context = summarize(context, highlighted)
    # elif reqType == 'simplify' and highlighted == '':
    #     response, context = simplify_full(context)
    # elif reqType == 'simplify' and highlighted != '':
    #     response, context = simplify(context, highlighted)
    # elif reqType == 'question':
    #     response, context = qanda(context, question)

    return {
        'response': response,
        'context': context
    }

def summarize_full(context):
    return "got it!", context

def load_article(article):
    return "Consider this following article: \n" + article

def scrape_text(raw_website):
    doc = Document(raw_website)
    summary_html = doc.summary()
    soup = BeautifulSoup(summary_html, 'html.parser')
    return soup.get_text()


raw_website_data = ''' '''

if __name__ == '__main__':
    app.run()
