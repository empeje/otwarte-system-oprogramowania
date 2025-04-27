from flask import Flask, request, jsonify

app = Flask(__name__)

# A sample API key for demonstration purposes
API_KEY = 'xrpapex2233'

@app.route('/confirm_exchange', methods=['POST'])
def confirm_exchange():
    try:
        # Check API key
        api_key = request.args.get('apikey')
        if api_key != API_KEY:
            return jsonify({'error': 'Invalid API key'}), 401

        # Extracting data from the request
        data = request.json
        source_currency = data['source_currency']
        target_currency = data['target_currency']
        source_to_target_rate = data['source_to_target_rate']
        amount = data['amount']

        # Calculating the target amount
        target_amount = amount * source_to_target_rate

        # Creating a response
        response = {
            'source_currency': source_currency,
            'target_currency': target_currency,
            'source_to_target_rate': source_to_target_rate,
            'amount': amount,
            'target_amount': target_amount,
            'status': 'being processed',
        }

        return jsonify(response), 200

    except KeyError as e:
        # Handling missing data
        return jsonify({'error': f'Missing key: {str(e)}'}), 400

    except Exception as e:
        # Handling other exceptions
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
