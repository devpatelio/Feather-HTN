# -*- coding: utf-8 -*-
"""HacktheNorth.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1m2eoKJjfqDk8V8sJmwj8UK4QGpOrFBBM
"""

# import os
# from os.path import isfile, join
# import glob
# from string import punctuation

# def preprocessing(path, keyword):
#     review = glob.glob(path+'*.txt')
#     text = list()
#     review = list(review)
    
#     for i in review:
#         with open(str(i), 'r') as rvw:
#             data = rvw.read()
#             text.append(data)
#     training_set= []    
#     for x in text:
#         item_text = x.replace('...', " ")        
#         item_text = ''.join([c for c in item_text if c not in punctuation]).lower().split()
#         training_set.append(item_text)
    
#     return list(training_set), text

# neg_text, text1 = preprocessing('/Users/devpatelio/Downloads/Coding/Python/pyTorch/Feather/aclImdb/train/neg/', 'neg')
# pos_text, text2 = preprocessing('/Users/devpatelio/Downloads/Coding/Python/pyTorch/Feather/aclImdb/train/pos/', 'pos')

# neg_text_test, text3 = preprocessing('/Users/devpatelio/Downloads/Coding/Python/pyTorch/Feather/aclImdb/test/neg/', 'neg')
# pos_text_test, text4 = preprocessing('/Users/devpatelio/Downloads/Coding/Python/pyTorch/Feather/aclImdb/test/pos/', 'pos')

# train_data = neg_text + pos_text
# test_data = neg_text_test + pos_text_test

# print(f'Number of training examples: {len(train_data)}')
# print(f'Number of testing examples: {len(test_data)}')

from string import punctuation

with open('/content/drive/MyDrive/Colab Notebooks/Sentiment Analysis/data/reviews.txt', 'r') as rev:
    reviews = rev.read()
with open('/content/drive/MyDrive/Colab Notebooks/Sentiment Analysis/data/labels.txt', 'r') as lab:
    labels = lab.read()


total_text = ''.join([c for c in reviews.lower() if c not in punctuation]).split('\n')

labels = labels.split('\n')

from collections import Counter
formatted_text = ' '.join(total_text).split()
count_words = Counter(formatted_text).most_common(len(formatted_text))
# print(count_words)

from google.colab import drive
drive.mount('/content/drive')

vocab_int_map = {word:i+1 for i, (word, _) in enumerate(count_words)}
# print(vocab_int_map)

encoded_reviews = list()
for review in total_text:
    enc_review = [vocab_int_map[word] for word in review.split()]
    encoded_reviews.append(enc_review)

encoded_labels = [0 if label=='negative' else 1 for label in labels]

# Commented out IPython magic to ensure Python compatibility.
import pandas as pd
import matplotlib.pyplot as plt
# %matplotlib inline
reviews_len = [len(x) for x in encoded_reviews]
pd.Series(reviews_len).hist()
plt.show()
pd.Series(reviews_len).describe()

# encoded_reviews = [ encoded_reviews[i] for i, l in enumerate(encoded_reviews) if l>0 ]

for i, l in enumerate(encoded_reviews):
    if len(l)==0:
        encoded_reviews.remove(encoded_reviews[i])
        encoded_labels.remove(encoded_labels[i])
    else:
        continue

import numpy as np

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

features = pad_features(encoded_reviews, 250)
print(features[:10, :])

import torch

split_frac = 0.8
len_feat = len(encoded_reviews)
train_x = torch.tensor(features[0:int(split_frac*len_feat)])
train_y = torch.tensor(encoded_labels[0:int(split_frac*len_feat)])
remaining_x = torch.tensor(features[int(split_frac*len_feat):])
remaining_y = torch.tensor(encoded_labels[int(split_frac*len_feat):])
valid_x = remaining_x[0:int(len(remaining_x)*0.5)]
valid_y = remaining_y[0:int(len(remaining_y)*0.5)]
test_x = remaining_x[int(len(remaining_x)*0.5):]
test_y = remaining_y[int(len(remaining_y)*0.5):]

import torch
from torch.utils.data import DataLoader, TensorDataset
# train_data = TensorDataset(torch.from_numpy(np.asarray(train_x)), torch.from_numpy(np.asarray(train_y)))
# valid_data = TensorDataset(torch.from_numpy(np.asarray(valid_x)), torch.from_numpy(np.asarray(valid_y)))
# test_data = TensorDataset(torch.from_numpy(np.asarray(test_x)), torch.from_numpy(np.asarray(test_y)))

train_data = TensorDataset(train_x, train_y)
test_data = TensorDataset(train_x, train_y)
valid_data = TensorDataset(train_x, train_y)

batch_size = 50

train_loader = DataLoader(train_data, shuffle=True, batch_size=batch_size)
validation_loader = DataLoader(valid_data, shuffle = True, batch_size=batch_size)
test_loader = DataLoader(test_data, shuffle = True, batch_size=batch_size)

is_cuda = torch.cuda.is_available()

if is_cuda:
    device = torch.device("cuda")
else:
    device = torch.device("cpu")

print(device)

dataiter = iter(train_loader)
sample_x, sample_y = dataiter.next()
print('Sample input size: ', sample_x.size()) # batch_size, seq_length
print('Sample input: \n', sample_x)
print()
print('Sample label size: ', sample_y.size()) # batch_size
print('Sample label: \n', sample_y)

import torch.nn as nn

class SentimentLSTM(nn.Module):
    def __init__ (self, vocab_size, output_size, embedding_dim, hidden_dim, n_layers, drop_prob=0.5):
        super(SentimentLSTM, self).__init__()
        
        self.output_size = output_size
        self.n_layers = n_layers
        self.hidden_dim = hidden_dim
        
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, n_layers, dropout=drop_prob, batch_first=True)
        
        self.dropout = nn.Dropout(0.3)
        
        self.fc = nn.Linear(hidden_dim, output_size)
        self.sig = nn.Sigmoid()
        
    def forward(self, x, hidden):
        batch_size = x.size(0)
        embeds = self.embedding(x)
        lstm_out, hidden = self.lstm(embeds, hidden)
        lstm_out = lstm_out.contiguous().view(-1, self.hidden_dim)
        out = self.dropout(lstm_out)
        out = self.fc(out)
        out = self.sig(out)
        
        out = out.view(batch_size, -1)
        out = out[:, -1]
        return out, hidden
    
    def init_hidden(self, batch_size):  
        weight = next(self.parameters()).data
        hidden = (weight.new(self.n_layers, batch_size, self.hidden_dim).zero_().to(device), weight.new(self.n_layers, batch_size, self.hidden_dim).zero_().to(device))
        return hidden

vocab_size = len(vocab_int_map) + 1
output_size = 1
embedding_dim = 400
hidden_dim = 200
n_layers = 2

net = SentimentLSTM(vocab_size, output_size, embedding_dim, hidden_dim, n_layers)
net.to(device)
print(net)

lr = 0.001
criterion = nn.BCELoss()
optimizer = torch.optim.Adam(net.parameters(), lr=lr)

epochs = 5
counter = 0
print_every = 1000
clip = 5
valid_loss_min = np.Inf

net.train()
for i in range(epochs):
    h = net.init_hidden(batch_size)
    
    for inputs, labels in train_loader:
        counter += 1
        h = tuple([e.data for e in h])
        inputs, labels = inputs.to(device), labels.to(device)
        net.zero_grad()
        output, h = net(inputs, h)
        loss = criterion(output.squeeze(), labels.float())
        loss.backward()
        nn.utils.clip_grad_norm_(net.parameters(), clip)
        optimizer.step()
        
        if counter%print_every == 0:
            val_h = net.init_hidden(batch_size)
            val_losses = []
            net.eval()
            for inp, lab in validation_loader:
                val_h = tuple([each.data for each in val_h])
                inp, lab = inp.to(device), lab.to(device)
                out, val_h = net(inp, val_h)
                val_loss = criterion(out.squeeze(), lab.float())
                val_losses.append(val_loss.item())
                
            net.train()
            print("Epoch: {}/{}...".format(i+1, epochs),
                  "Step: {}...".format(counter),
                  "Loss: {:.6f}...".format(loss.item()),
                  "Val Loss: {:.6f}".format(np.mean(val_losses)))
            if np.mean(val_losses) <= valid_loss_min:
                torch.save(net.state_dict(), './state_dict.pt')
                print('Validation loss decreased ({:.6f} --> {:.6f}).  Saving model ...'.format(valid_loss_min,np.mean(val_losses)))
                valid_loss_min = np.mean(val_losses)

# Loading the best model
net.load_state_dict(torch.load('./state_dict.pt'))

test_losses = []
num_correct = 0
h = net.init_hidden(batch_size)

net.eval()
for inputs, labels in test_loader:
    h = tuple([each.data for each in h])
    inputs, labels = inputs.to(device), labels.to(device)
    output, h = net(inputs, h)
    test_loss = criterion(output.squeeze(), labels.float())
    test_losses.append(test_loss.item())
    pred = torch.round(output.squeeze())  # Rounds the output to 0/1
    correct_tensor = pred.eq(labels.float().view_as(pred))
    correct = np.squeeze(correct_tensor.cpu().numpy())
    num_correct += np.sum(correct)

print("Test loss: {:.3f}".format(np.mean(test_losses)))
test_acc = num_correct/len(test_loader.dataset)
print("Test accuracy: {:.3f}%".format(test_acc*100))

from string import punctuation

test_review_neg = 'A man punched me and it hurt a lot. I was in pain and was sad.'

def tokenize_review(test_review):
    test_review = test_review.lower()
    test_text = ''.join([c for c in test_review if c not in punctuation])
    test_words = test_text.split()

    test_ints = []
    test_ints.append([vocab_int_map[word] for word in test_words])
    return test_ints

test_ints = tokenize_review(test_review_neg)
print(test_ints)


seq_length=200
features = pad_features(test_ints, seq_length)

feature_tensor = torch.from_numpy(features)
print(feature_tensor.size())


def predict(net, test_review, sequence_length=200):
    net.eval()
    test_ints = tokenize_review(test_review)
    
    seq_length=sequence_length
    features = pad_features(test_ints, seq_length)
    feature_tensor = torch.from_numpy(features)
    batch_size = feature_tensor.size(0)
    h = net.init_hidden(batch_size)
    feature_tensor = feature_tensor.cuda()
    output, h = net(feature_tensor, h)
    pred = torch.round(output.squeeze()) 
    print('Prediction value, pre-rounding: {:.6f}'.format(output.item()))
    readable = ''
    if (pred.item()==1):
        readable = 'Positive'
    else:
        readable = 'Negative'
    return int(pred), readable
seq_length=200 
predict(net, test_review_neg, seq_length)

!pip install Flask

!pip install flask-ngrok

torch.save(net.state_dict(), 'checkpoint.pth')

from flask_ngrok import run_with_ngrok
from flask import Flask, render_template, redirect, url_for, request
app = Flask(__name__)
run_with_ngrok(app)   #starts ngrok when the app is run

from flask import Flask, jsonify, request
from string import punctuation
from collections import Counter
import numpy as np

network = net

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




def predict(net, test_review, sequence_length):
    network.eval()
    test_ints = tokenize_review(test_review)
    seq_length=sequence_length
    features = pad_features(test_ints, seq_length)
    feature_tensor = torch.from_numpy(features)
    batch_size = feature_tensor.size(0)
    h = network.init_hidden(batch_size)
    feature_tensor = feature_tensor.to(device)
    output, h = network(feature_tensor, h)
    pred = torch.round(output.squeeze()) 
    print('Prediction value, pre-rounding: {:.6f}'.format(output.item()))
    readable = ''
    if (pred.item()==0):
        readable = 'Positive'
    else:
        readable = 'Negative'
    return int(pred), readable


seq_length=250


@app.route("/journal", methods=['POST', 'GET'])
def home():
  if request.method == "POST":
    entry = request.form['text']
    return redirect(url_for("prediction", etry=entry))
  else: 
    return "<h1> Dialogue Page</h1> <form action='#' method='post'> <p>Name:</p> <p><input type='text' name='text'></p> <p><input type='submit' value='submit'></p> </form>"

@app.route("/<etry>")
def prediction(etry):
    prediction, label = predict(network, etry, seq_length)
    return f"<h1>{label}</h1>"



 
app.run()

