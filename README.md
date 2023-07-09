# Off-Topic-ADHD-Tool

A Google Chrome add-on that allows users to enter what topic they're currently focusing on, such as studying for their Operating Systems exam. Subsequently, if the user searches of accesses webpages unrelated to their specified topic, a popup reminds them that they may be going off-topic.

A simple Javascript front-end is used for the add-on, with a Go backend. The user enters a keyword which makes a request for Go to perform Natural Language Processing using word2vec algorithm to return a list of related words which are used to search any webpage the user searches for those words.
