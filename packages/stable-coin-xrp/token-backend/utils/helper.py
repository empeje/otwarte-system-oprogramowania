import yaml


def get_seed(_type='wallet'):
    # Define the path to your YAML file
    yaml_file_path = 'config.yml'

    # Read the YAML file
    with open(yaml_file_path, 'r') as file:
        config = yaml.safe_load(file)

    # Extract the seed value
    return config.get(_type, {}).get('seed', None)