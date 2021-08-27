from users import *


@app.route('/api/v1/user', methods=['GET'])
def get_users():
    return jsonify(User.get_all_users())


@app.route('/api/v1/user/<int:id>', methods=['GET'])
def get_user_by_id(id):
    return jsonify(User.get_user(id))


@app.route('/api/v1/user', methods=['POST'])
def add_user():
    try:
        user_schema.load(request.get_json())
    except ValidationError as err:
        return jsonify(err.messages), 422

    User.add_user(request.get_json())
    return Response("User Added", 201, mimetype='application/json')


@app.route('/api/v1/user/<int:id>', methods=['PUT'])
def update_user(id):
    try:
        user_schema.load(request.get_json())
    except ValidationError as err:
        return jsonify(err.messages), 422

    User.update_user(request.get_json())
    return Response("User Updated", status=200, mimetype='application/json')


@app.route('/api/v1/user/<id>', methods=['DELETE'])
def remove_user(id):
    User.delete_user(id)
    return Response("User Deleted", status=200, mimetype='application/json')


if __name__ == "__main__":
    app.run(port=5000, debug=True)
