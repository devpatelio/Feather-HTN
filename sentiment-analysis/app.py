from flask import Flask, jsonify, request
from string import punctuation
from collections import Counter
import numpy as np

app = Flask(__name__)
model = model
test_review = 'A man punched me and it hurt a lot. I was in pain.'

def tokenize_review(test_review):
    test_review = test_review.lower() # lowercase
    test_text = ''.join([c for c in test_review if c not in punctuation])
    test_words = test_text.split()
    test_ints = []
    test_ints.append([vocab_int_map[word] for word in test_words])
    return test_ints

def pad_features(encoded_reviews, seq_length):
    features = np.zeros((len(encoded_reviews), seq_length), dtype=int)
    
    for i, review in enumerate(encoded_reviews):
        review_len = len(review)
        if review_len <= seq_length:
            zeros = list(np.zeros(seq_length-review_len))
            new = zeros+review
        elif review_len > seq_length:
            new = review[0:seq_length]
            
        features[i, :] = np.array(new)
    return features

test_ints = tokenize_review(test_review)
seq_length=250
features = pad_features(test_ints, seq_length)
feature_tensor = torch.from_numpy(features)




def predict(net, test_review, sequence_length=200):
    net.eval()
    test_ints = tokenize_review(test_review)
    seq_length=sequence_length
    features = pad_features(test_ints, seq_length)
    feature_tensor = torch.from_numpy(features)
    batch_size = feature_tensor.size(0)
    h = net.init_hidden(batch_size)
    feature_tensor = feature_tensor.to(device)
    output, h = net(feature_tensor, h)
    pred = torch.round(output.squeeze()) 
    print('Prediction value, pre-rounding: {:.6f}'.format(output.item()))
    readable = ''
    if (pred.item()==0):
        readable = 'Positive'
    else:
        readable = 'Negative'
    return int(pred), readable


@app.route('/predict', methods['POST'])
def predict():
    if request.method=='POST':
        text = request.input_text['text']
        formatted_response = tokenize_review(text)
        prediction, label = predict(formatted_response)
        return jsonify({'pred_int': prediction, 'pred_label': label})