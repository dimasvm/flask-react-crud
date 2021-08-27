from marshmallow import Schema, fields, validate, EXCLUDE


class UserSchema(Schema):
    id = fields.Number(dump_only=True)
    first_name = fields.Str(
        required=True,
        validate=[validate.NoneOf(
            iterable=[""], error="Nama depan harus diisi")])
    last_name = fields.Str(
        required=True,
        validate=[validate.NoneOf(
            iterable=[""], error="Nama belakang harus diisi")])
    address = fields.Str(
        required=True,
        validate=[validate.NoneOf(
            iterable=[""], error="Nama alamat harus diisi")])
    birth = fields.Date(
        required=True,
        validate=[validate.NoneOf(
            iterable=[""], error="Tanggal lahir harus diisi")],
        error_messages={'invalid': 'Tanggal tidak valid'})
    height = fields.Int(
        required=True,
        validate=[validate.NoneOf(
            iterable=[""], error="Tinggi badan harus diisi"), validate.Range(
            min=150, max=200, error="Minimal tinggi badan 150 dan maksimum tinggi badan 200")],
        error_messages={'required': 'Tinggi badan harus diisi'})
    weight = fields.Int(
        required=True,
        validate=[validate.NoneOf(
            iterable=[""], error="Nama depan harus diisi"), validate.Range(
            min=45, max=100, error="Minimal berat badan 45 dan maksimum berat badan 100")],
        error_messages={'required': 'Berat badan harus diisi'})
    parent_income = fields.Int()


user_schema = UserSchema(unknown=EXCLUDE)
